"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors")); // to shut the cross-origin policy warnings
const db_1 = __importDefault(require("./db/db"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json()); // to parse the incoming request body to json
const MYDIRTYPORT = 6969; // inspired from the assets given by my seniors
app.get("/", (_, res) => {
    res.send("Welcome to the freakin Todo API. Made by lovelin dhoni AIML-B'27");
});
app.get("/todos", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, error } = yield db_1.default.from("todos").select();
        if ((data === null || data === void 0 ? void 0 : data.length) == 0) {
            // if the data error is empty
            res.json({ responseData: "No todo exists", isSuccess: true });
        }
        else {
            // else return the data array
            res.json({ isSuccess: true, responseData: data });
        }
    }
    catch (error) {
        return res.json({ error });
    }
}));
app.get("/todos/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, error } = yield db_1.default
            .from("todos")
            .select()
            .eq("id", req.params.id); // selects the todo matching the specified id on route
        if ((data === null || data === void 0 ? void 0 : data.length) == 0) {
            // if the data array is empty
            res.json({
                responseData: `Todo with id ${req.params.id} doesn't exist`,
                isSuccess: false,
            });
        }
        else {
            // else return the data array
            res.json({ isSuccess: true, responseData: data });
        }
    }
    catch (error) {
        res.send({ error });
    }
}));
app.post("/todos/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { task, status } = req.body;
        const { data, error } = yield db_1.default
            .from("todos") // inserts a new todo into database and returns it
            .insert({ task, status })
            .select();
        if ((data === null || data === void 0 ? void 0 : data.length) == 0) {
            // if anything goes wrong
            res.json({ responseData: "Failed to create todo", isSuccess: false });
        }
        else {
            res.json({ isSuccess: true, responseData: data });
        }
    }
    catch (error) {
        res.json(error);
    }
}));
app.delete("/todos/delete/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield db_1.default
            .from("todos")
            .select()
            .eq("id", req.params.id);
        if ((data === null || data === void 0 ? void 0 : data.length) != 0) {
            // checks whether an todo with specifed id exists
            const { error } = yield db_1.default
                .from("todos")
                .delete() // delete the todo
                .eq("id", req.params.id);
            res.json({
                responseData: `Todo ${req.params.id} successfully deleted`,
                isSuccess: true,
            });
        }
        else {
            res.json({
                responseData: `Todo with id ${req.params.id} doesn't exist`,
                isSuccess: false,
            });
        }
    }
    catch (error) {
        res.json(error);
    }
}));
app.put("/todos/update/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { task, status } = req.body;
        const { data } = yield db_1.default
            .from("todos")
            .select() // checks if a todo exists with the specified id
            .eq("id", req.params.id);
        if ((data === null || data === void 0 ? void 0 : data.length) != 0) {
            const { data, error } = yield db_1.default
                .from("todos")
                .update({ task, status }) // then updates the task and status fields of that todo
                .eq("id", req.params.id)
                .select();
            res.json({ isSuccess: true, responseData: data });
        }
        else {
            res.json({
                responseData: `Todo with id ${req.params.id} doesn't exist`,
                isSuccess: false,
            });
        }
    }
    catch (error) {
        res.json(error);
    }
}));
app.listen(MYDIRTYPORT, () => {
    console.log(`Todo endpoint running on port ${MYDIRTYPORT}`);
});
module.exports = app;
// :)
