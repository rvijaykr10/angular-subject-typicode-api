import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { PostsService } from '../../services/posts.service';
import { Post } from '../../models/post/post.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  loading: boolean = true;

  private postsSub: Subscription = new Subscription();

  constructor(private postService: PostsService) {}

  ngOnInit() {
    this.postService.getPosts();
    this.postsSub = this.postService
      .getPostsListener()
      .subscribe((postData: { posts: Post[] }) => {
        this.posts = postData.posts;
        this.loading = false;
        console.log(this.posts);
      });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
