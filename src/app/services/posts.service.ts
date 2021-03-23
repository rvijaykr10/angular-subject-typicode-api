import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from "rxjs";

import { Post } from '../models/post/post.model';
@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private storedData : Post[] = [];
  private fetchedPosts = new Subject<{posts : Post[]}>();
  
  constructor(private http : HttpClient) { }

  getPosts(){
    this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
    .subscribe( data => {
      this.storedData = data;
      this.fetchedPosts.next({
        posts: [...this.storedData]
      })
    })
  }

  getPostsListener(){
    return this.fetchedPosts.asObservable();
  }
}