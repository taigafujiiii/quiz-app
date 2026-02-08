import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { serializeBigInt } from '../common/serializers/bigint.serializer';
import { AssignmentQuizDto } from './dto/assignment-quiz.dto';
import { FreeQuizDto } from './dto/free-quiz.dto';
import { QuizService } from './quiz.service';

@Controller('quiz')
@UseGuards(JwtAuthGuard)
export class QuizController {
  constructor(private readonly quiz: QuizService) {}

  @Post('free')
  async free(@Req() req: any, @Body() dto: FreeQuizDto) {
    const user = req.user as { id: string; role: string };
    return serializeBigInt(await this.quiz.freeQuiz(user, dto));
  }

  @Post('assignment')
  async assignment(@Req() req: any, @Body() dto: AssignmentQuizDto) {
    const user = req.user as { id: string; role: string };
    return serializeBigInt(await this.quiz.assignmentQuiz(user, dto));
  }
}
