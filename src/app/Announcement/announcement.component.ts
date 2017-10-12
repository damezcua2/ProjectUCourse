import { AnnouncementService } from './AnnouncementService/announcemenet.service';
import { Announcement } from '../models/announcement.model';


import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-announcement',
  templateUrl: '/announcement.component.html',
  styleUrls: ['/announcement.component.css']
})

export class AnnouncementComponent {
  @Input() announcement : Announcement;

  constructor(private announcementService : AnnouncementService){}

  onDelete(){
    this.announcementService.removeAnnouncement(this.announcement)
    .subscribe(
      //result => console.log(result)
    );
  }
}