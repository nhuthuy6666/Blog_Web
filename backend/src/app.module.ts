import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountsModule } from 'src/modules/accounts/accounts.module';
import { AchievementsModule } from 'src/modules/achievements/achievements.module';
import { AuthorsModule } from 'src/modules/authors/authors.module';
import { BlogsModule } from 'src/modules/blogs/blogs.module';
import { CommentsModule } from 'src/modules/comments/comments.module';
import { FollowsModule } from 'src/modules/follows/follows.module';
import { SavesModule } from 'src/modules/saves/saves.module';
import { SkillsModule } from 'src/modules/skills/skills.module';
import { AuthModule } from 'src/auth/auth.module';
import { LikesModule } from 'src/modules/likes/likes.module';

@Module({
  imports: [
    AuthorsModule,
    AccountsModule,
    AchievementsModule,
    BlogsModule,
    CommentsModule,
    FollowsModule,
    SavesModule,
    SkillsModule,
    AuthModule,
    LikesModule,
    ConfigModule.forRoot({isGlobal: true}),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    })
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
