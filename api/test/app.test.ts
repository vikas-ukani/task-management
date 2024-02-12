import app from "../app"
import request from "supertest";


describe("Test for run app successfully", () => {
    it("it should run the default route.", async () => {
        const res = await request(app).get('/')
        expect(res.body).toEqual({ message: "Welcome to the task management application." });
    })
    it("it should return wrong message in response.", async () => {
        const res = await request(app).get('/')
        expect(res.body).not.toEqual({ message: "Hey, Welcome to the task management application." });
    })
})