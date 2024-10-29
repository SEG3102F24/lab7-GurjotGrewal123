import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthorService } from './service/author.service';
import { Author } from '../books/model/book';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css'],
  imports: [ReactiveFormsModule, NgIf], 
  standalone: true,
})
export class AuthorsComponent {
  authorForm: FormGroup;
  author: Author | null = null;
  message = '';

  constructor(private fb: FormBuilder, private authorService: AuthorService) {
    this.authorForm = this.fb.group({
      authorId: ['']
    });
  }

  onSubmit() {
    const authorId = this.authorForm.get('authorId')?.value;
    this.authorService.getAuthor(authorId).subscribe({
      next: (author: Author) => {
        this.author = author;
        this.message = '';
      },
      error: () => {
        this.author = null;
        this.message = 'Author not found.';
      }
    });
  }
}
