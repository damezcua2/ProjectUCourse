import { DiscussionEditComponent } from './Discussion/Discussion-edit/discussion-edit.component';
import { DiscussionInputComponent } from './Discussion/Discussion-input/discussion-input.component';
import {
  AssignmentQuestionInputComponent,
} from './assignmentQuestion/assignmentQuestion-input/assignmentQuestion-input.component';
import { AssignmentMenuComponent } from './assignmentMenu/assignmentMenu.component';
import { AssignmentInputComponent } from './assignment/assignment-input/assignment-input.component';
import { AnnouncementEditComponent } from './Announcement/Announcement-edit/announcement-edit.component';
import { AnnouncementInputComponent } from './Announcement/Announcement-input/announcement-input.component';
import { COURSEMENU_ROUTES } from './courseMenu/courseMenu.routes';
import { CourseMenuComponent } from './courseMenu/courseMenu.component';
import { DashboardCourseInputComponent } from './dashboard/dashboardCourse-input.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';


import { AuthenticationComponent } from './auth/authentication.component';
import { SigninComponent } from './auth/signin.component';
import { SignupComponent } from './auth/signup.component';
import { LogoutComponent } from './auth/logout.component';
import { ProfileComponent} from './profile/profile.component';
const APP_ROUTES: Routes = [
    // path full only react to this path if it is default path
    { path: '', redirectTo: '/signin', pathMatch: 'full'},
    { path: 'auth', component: AuthenticationComponent},
    { path: 'signin', component: SigninComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'logout', component: LogoutComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'newcourse', component: DashboardCourseInputComponent},
    { path: 'profile', component: ProfileComponent},
    { path: 'newannouncement', component: AnnouncementInputComponent},
    { path: 'editannouncement', component: AnnouncementEditComponent},
    { path: 'newassignment', component: AssignmentInputComponent},
    { path: 'courseMenu/:courseID', component: CourseMenuComponent, children: COURSEMENU_ROUTES},
    { path: 'assignmentMenu/:assignmentID', component: AssignmentMenuComponent},
    { path: 'newassignmentQuestion', component: AssignmentQuestionInputComponent},
    { path: 'newdiscussion', component: DiscussionInputComponent},
    { path: 'editdiscussion', component: DiscussionEditComponent},
    
];

export const routing = RouterModule.forRoot(APP_ROUTES);
