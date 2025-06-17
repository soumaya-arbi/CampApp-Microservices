import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../feedbacks.service';
import { Feedback } from '../feedback.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css'],
})
export class FeedbackListComponent implements OnInit {
  feedbacks: Feedback[] = [];
  centreId: number = 0;
  constructor(
    private feedbackService: FeedbackService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const centreIdStr = this.route.snapshot.paramMap.get('centreId');
    if (centreIdStr !== null) {
      this.centreId = +centreIdStr;
      this.loadFeedbacksByCentreId();
    } else {
      console.error('centreId is null');
    }
  }

  loadFeedbacksByCentreId(): void {
    this.feedbackService.getFeedbacksByCentreId(this.centreId).subscribe(
      (data) => {
        this.feedbacks = data;
      },
      (error) => {
        console.error('Error loading feedbacks:', error);
      }
    );
  }
  deleteFeedback(id: number | undefined) {
    if (id !== undefined) {
      this.feedbackService.deleteFeedback(id).subscribe(
        () => {
          // Refresh the feedback list after deletion
          this.loadFeedbacksByCentreId();
        },
        (error) => {
          console.error('Error deleting feedback:', error);
        }
      );
    } else {
      console.error('Cannot delete feedback: ID is undefined.');
    }
  }
  goToCreatefeed(): void {
    this.router.navigate(['/feed', this.centreId]);
  }
}

