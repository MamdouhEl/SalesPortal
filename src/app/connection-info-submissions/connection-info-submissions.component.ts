import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { ExistPost } from '../Exist.service';
import { AdminModel } from '../Admin.model';
import { CustomerModel } from '../Customer.model';
import { Exist } from '../Exist.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Contact } from '../Contact.model';
import {ExcelService} from '../ExportCSV/excel.service';
import { AuthService } from '../auth/auth.service';
import { ScoreBoard } from '../ScoreBoard.model';

@Component({
  selector: 'app-connection-info-submissions',
  templateUrl: './connection-info-submissions.component.html',
  styleUrls: ['./connection-info-submissions.component.css']
})
export class ConnectionInfoSubmissionsComponent implements OnInit, OnDestroy {

  newContact: Contact[] = [];
  ScoreBoard: ScoreBoard[];
  ScoreBoardLength: Number;
  totalPoints: Number;
  private ContactSub: Subscription;
  private ScoreBoardSub: Subscription;
  points = -1;
  Status: string;
  public searchString: string;
  selectedNav: String;

  constructor(private router: Router, public ExistService: ExistPost, private excelService: ExcelService,
     public authService: AuthService) {}

  ngOnInit() {
    this.ExistService.getContact();
    this.ContactSub = this.ExistService.getContactUpdatedListener()
      .subscribe((newContacts: Contact[]) => {
        this.newContact = newContacts;
      });

    this.ExistService.FindinScoreBoard(this.authService.username);
    this.ScoreBoardSub = this.ExistService.getScoreBoardListener()
      .subscribe((ScoreEntries: ScoreBoard[]) => {
        this.ScoreBoard = ScoreEntries;
        this.ScoreBoardLength = ScoreEntries.length;
    });

  }

  ngOnDestroy() {
    this.ContactSub.unsubscribe();
    this.ScoreBoardSub.unsubscribe();
  }

  exportAsXLSX() {
    this.excelService.exportAsExcelFile(this.newContact, 'ConnnectionSubmission');
 }

 onAccept(points: string, id: string, Cpoints: string, user: string) {
  if (points === '0') {
    this.points = parseInt(points, 10);
    this.Status = 'Submission Received';
  } else if (points === '-1') {
    this.points = parseInt(points, 10);
    this.Status = 'Returned';
    this.ExistService.editable[id] = true;
  } else if (points === '1') {
    this.points = parseInt(points, 10);
    this.Status = 'Pending Validation';
  } else if (points === '5' || points === '10' || points === '15') {
    this.points = parseInt(Cpoints, 10) + parseInt(points, 10);
    this.Status = 'In progress';
  } else if (points === '50' || points === '100' || points === '200') {
    this.points = parseInt(Cpoints, 10) + parseInt(points, 10);
    this.Status = 'Win';
  } else if (points === '20') {
    this.points = parseInt(Cpoints, 10) + parseInt(points, 10);
    this.Status = 'lost';
  } else if (points === '') {
    return;
  }

  this.ExistService.FindinScoreBoard(user);
  console.log('I am here');
  this.ExistService.getScoreBoardListener().subscribe((ScoreEntries: ScoreBoard[]) => {
    this.ScoreBoard = ScoreEntries;
    this.ScoreBoardLength = ScoreEntries.length;
    this.updateScoreBoard(id, user);

  });



  }

  updateScoreBoard (id, user) {
    console.log('I am here');
    this.totalPoints = 0;
    let enter = false;
    let found = false;
  if (this.ScoreBoardLength !== 0) {
    for (let k = 0; k < this.ScoreBoardLength; k++) {
      if (user === this.ScoreBoard[k].UserName) {
        found = true;
      }
    }
    console.log('I am here' + this.ScoreBoardLength);
    for (let i = 0; i < this.newContact.length; i++) {

      for (let j = 0; j < this.ScoreBoardLength; j++) {
        console.log(this.newContact[i].Submitter,  this.ScoreBoard[j].UserName);
        if (this.newContact[i].Submitter === user && found && this.newContact[i].id !== id) {
          console.log('i = ' + i + 'points = ' + parseInt(this.newContact[i].Points, 10));
          this.totalPoints = this.points + parseInt(this.newContact[i].Points, 10);
          enter = true;
        }
    }
    if (!enter) {
      const newScoreBoardEntry: ScoreBoard = {
        UserName: user,
        Points: this.points.toString()
      };
      this.ExistService.AddtoScoreBoard(newScoreBoardEntry);
    }

    }
    console.log('Total = ' + this.totalPoints);
    this.ExistService.UpdateScoreBoard(user, this.totalPoints.toString());
  } else {
    console.log('here2');
    const newScoreBoardEntry: ScoreBoard = {
      UserName: user,
      Points: this.points.toString()
    };
    this.ExistService.AddtoScoreBoard(newScoreBoardEntry);
  }

  this.newContact[+id - 1].Points = this.points.toString();
  this.newContact[+id - 1].Status = this.Status;
  this.ExistService.UpdateContact(id, String(this.points), this.Status);
  }

}
