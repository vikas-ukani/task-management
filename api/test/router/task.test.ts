import request from "supertest";
import app from "../../app";

describe("Test check tasks without authentication", () => {
    it("it should return failed.", async () => {
        const res = await request(app).get('/tasks/')
        expect(res.statusCode).toBe(401)
        expect(res.body)
            .toEqual({"message": "Please login to access information.", "status": false});
    })
})