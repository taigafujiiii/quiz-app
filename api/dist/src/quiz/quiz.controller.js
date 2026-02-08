"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const bigint_serializer_1 = require("../common/serializers/bigint.serializer");
const assignment_quiz_dto_1 = require("./dto/assignment-quiz.dto");
const free_quiz_dto_1 = require("./dto/free-quiz.dto");
const quiz_service_1 = require("./quiz.service");
let QuizController = class QuizController {
    quiz;
    constructor(quiz) {
        this.quiz = quiz;
    }
    async free(req, dto) {
        const user = req.user;
        return (0, bigint_serializer_1.serializeBigInt)(await this.quiz.freeQuiz(user, dto));
    }
    async assignment(req, dto) {
        const user = req.user;
        return (0, bigint_serializer_1.serializeBigInt)(await this.quiz.assignmentQuiz(user, dto));
    }
};
exports.QuizController = QuizController;
__decorate([
    (0, common_1.Post)('free'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, free_quiz_dto_1.FreeQuizDto]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "free", null);
__decorate([
    (0, common_1.Post)('assignment'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, assignment_quiz_dto_1.AssignmentQuizDto]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "assignment", null);
exports.QuizController = QuizController = __decorate([
    (0, common_1.Controller)('quiz'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [quiz_service_1.QuizService])
], QuizController);
//# sourceMappingURL=quiz.controller.js.map