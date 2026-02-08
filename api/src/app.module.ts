import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { InvitesModule } from './invites/invites.module';
import { UnitsModule } from './units/units.module';
import { CategoriesModule } from './categories/categories.module';
import { QuestionsModule } from './questions/questions.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { QuizModule } from './quiz/quiz.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    InvitesModule,
    UnitsModule,
    CategoriesModule,
    QuestionsModule,
    AssignmentsModule,
    QuizModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
