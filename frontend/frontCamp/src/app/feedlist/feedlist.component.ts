import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../feedbacks.service';
import { Feedback } from '../feedback.model';
import { AuthService } from '../auth.service'; // Importer AuthService
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedlist',
  templateUrl: './feedlist.component.html',
  styleUrls: ['./feedlist.component.css'],
})
export class FeedListComponent implements OnInit {
  feedbacks: Feedback[] = [];
  userId: number | null = null;

  constructor(
    private feedbackService: FeedbackService,
    private authService: AuthService, // Injecter AuthService
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getUserId().subscribe((id) => {
      if (id !== null) {
        this.userId = id;
        this.loadFeedbacksByUserId();
      } else {
        console.error('User ID is null');
      }
    });
  }

  loadFeedbacksByUserId(): void {
    if (this.userId !== null) {
      this.feedbackService.getFeedbacksByUserId(this.userId).subscribe(
        (data) => {
          this.feedbacks = data;
        },
        (error) => {
          console.error('Error loading feedbacks:', error);
        }
      );
    }
  }

  deleteFeedback(id: number | undefined) {
    if (id !== undefined) {
      this.feedbackService.deleteFeedback(id).subscribe(
        () => {
          // Refresh the feedback list after deletion
          this.loadFeedbacksByUserId();
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
    if (this.userId !== null) {
      this.router.navigate(['/feed', this.userId]);
    } else {
      console.error('User ID is null');
    }
  }
}
