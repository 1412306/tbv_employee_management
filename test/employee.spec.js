process.env.NODE_ENV = "default";
const Helper = require("./helpers/helper");
const path = require("path");
const DepartmentModel = require(path.resolve(
  "./src/api/department/department.model"
));
const PositionConstant =
  require(path.resolve("./src/api/employee/employee.constant")).position || {};
const TeamModel = require(path.resolve("./src/api/team/team.model"));
const EmployeeModel = require(path.resolve(
  "./src/api/employee/employee.model"
));
const helper = new Helper();
const urlPrefix = "/api";

let token;

const Departments = [
  { department_name: "HR" },
  { department_name: "Marketing" },
  { department_name: "Dev" },
];
const Teams = [
  { team_name: "Team Project 1", department_pos: 1 },
  { team_name: "Team Project 2", department_pos: 0 },
  { team_name: "Team Project 3", department_pos: 2 },
  { team_name: "Team Project 4", department_pos: 1 },
  { team_name: "Team Project 5", department_pos: 2 },
  { team_name: "Team Project 6", department_pos: 2 },
];
const Employees = [
  { position_code: PositionConstant.DIRECTOR },
  { position_code: PositionConstant.MANAGER, team_pos: 0 },
  { position_code: PositionConstant.MANAGER, team_pos: 1 },
  { position_code: PositionConstant.MANAGER, team_pos: 2 },
  { position_code: PositionConstant.MANAGER, team_pos: 3 },
  { position_code: PositionConstant.MANAGER, team_pos: 4 },
  { position_code: PositionConstant.MANAGER, team_pos: 5 },
];
const initializeDepartments = async () => {
  let department_ids = [];
  let team_ids = [];
  await DepartmentModel.remove({});
  await TeamModel.remove({});
  await EmployeeModel.remove({});

  for (let i = 0; i < Departments.length; i++) {
    newDep = await DepartmentModel.create(Departments[i]);
    department_ids.push(newDep);
  }
  for (let i = 0; i < Teams.length; i++) {
    const data = {
      team_name: Teams[i].team_name,
      department: department_ids[Teams[i].department_pos],
    };
    newTeam = await TeamModel.create(data);
    team_ids.push(newTeam);
  }
  //create director
  await EmployeeModel.create({
    name: "Mr/Mrs Director",
    email: "director@tbv.vn",
    posision_code: PositionConstant.DIRECTOR,
    position: "Director",
  });

  //create manager
  for (let i = 0; i < department_ids.length; i++) {
    await EmployeeModel.create({
      name: "Mr/Mrs Manager of " + department_ids[i].department_name,
      email: "manager0f" + department_ids[i].department_name + "@tbv.vn",
      posision_code: PositionConstant.MANAGER,
      position: "Manager",
      department: {
        _id: department_ids[i]._id,
        department_name: department_ids[i].department_name,
      },
    });
  }

  for (let i = 0; i < 2000; i++) {
    let n_team_to_join = Math.floor(Math.random() * team_ids.length);

    let department_to_join = Math.floor(Math.random() * department_ids.length);

    let teams_to_join = team_ids.slice(team_ids.length - n_team_to_join);

    let data = {
      name: "Employee " + i,
      email: "employee" + i + "@tbv.vn",
      teams: teams_to_join,
      department: {
        _id: department_ids[department_to_join]._id,
        department_name: department_ids[department_to_join].department_name,
      },
    };
    newEmployee = await EmployeeModel.create(data);
  }
};

describe("Authentication endpoints", () => {
  it("Login success response access token and refresh token", async () => {
    const { body } = await helper.apiServer.post(
      `${urlPrefix}/authentication/login`,
      {
        email: "email@mailinator.com",
      }
    );
    token = body.accessToken;
    expect(body).toHaveProperty("accessToken");
    expect(body).toHaveProperty("refreshToken");
  });
});

describe("Employee endpoints", () => {
  beforeEach(() => {
    return initializeDepartments();
  });

  it("Create employee successfully", async () => {
    const { body, statusCode } = await helper.apiServer
      .post(`${urlPrefix}/employee/create`)
      .send({
        email: "NV0001@techbase.vn",
        phone: "0123456789",
      })
      .set({ "x-access-token": token });
    expect(statusCode).toEqual(200);
    expect(body._id).toBeDefined();
    expect(body).toHaveProperty("email");
    expect(body.email).toEqual("NV0001@techbase.vn");
    expect(body).toHaveProperty("created_at");
    expect(body).toHaveProperty("updated_at");
  });
  it("Not create employee missing email", async () => {
    const { body, statusCode } = await helper.apiServer
      .post(`${urlPrefix}/employee/create`)
      .send({
        phone: "0123456789",
      })
      .set({ "x-access-token": token });
    expect(statusCode).toEqual(422);
    expect(body).toHaveProperty("message");
    expect(body.message).toEqual("Required fields are missing!");
  });

  it("Get employees not have limit, response only 20 records", async () => {
    const { body, statusCode } = await helper.apiServer
      .post(`${urlPrefix}/employee/list`)
      .set({ "x-access-token": token });
    expect(statusCode).toEqual(200);
    expect(body).toHaveProperty("list");
    expect(body.list.length).toEqual(20);
  });

  it("Get employees have limit > 1500, response only 20 records", async () => {
    const { body, statusCode } = await helper.apiServer
      .post(`${urlPrefix}/employee/list`)
      .send({ meta: { limit: 2000 } })
      .set({ "x-access-token": token });
    expect(statusCode).toEqual(200);
    expect(body).toHaveProperty("list");
    expect(body.list.length).toEqual(20);
  });
  it("Count employees work correctly", async () => {
    const { body, statusCode } = await helper.apiServer
        .post(`${urlPrefix}/employee/count`)
        .set({ "x-access-token": token });
    expect(statusCode).toEqual(200);
    expect(body).toHaveProperty("count");
    expect(body.count).toEqual(2004);
  });
});
