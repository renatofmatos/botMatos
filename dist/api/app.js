"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_js_1 = __importDefault(require("../routes/index.js"));
const app = (0, express_1.default)();
(0, index_js_1.default)(app);
exports.default = app;
//# sourceMappingURL=app.js.map