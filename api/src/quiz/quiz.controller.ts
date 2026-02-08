import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { serializeBigInt } from '../common/serializers/bigint.serializer';
import { AssignmentQuizDto } from './dto/assignment-quiz.dto';
import { FreeQuizDto } from './dto/free-quiz.dto';
import { QuizService } from './quiz.service';

type RequestUser = { id: string; role: string };

@Controller('quiz')
@UseGuards(JwtAuthGuard)
export class QuizController {
  constructor(private readonly quiz: QuizService) {}

  @Post('free')
  async free(@Req() req: Request & { user: RequestUser }, @Body() dto: FreeQuizDto) {
    const user = req.user;
    return serializeBigInt(await this.quiz.freeQuiz(user, dto));
  }

  @Post('assignment')
  async assignment(
    @Req() req: Request & { user: RequestUser },
    @Body() dto: AssignmentQuizDto,
  ) {
    const user = req.user;
    return serializeBigInt(await this.quiz.assignmentQuiz(user, dto));
  }
}
