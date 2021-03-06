import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Headers, RequestOptions,Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Router  } from '@angular/router';
import 'rxjs/add/operator/map';
@Injectable()
export class AuthServiceService {
  public user = new BehaviorSubject<Object>({});
  public currentUser = this.user.asObservable();
  constructor(private route: Router ,private http : HttpClient) {
    this.checkToken().subscribe(res=>{
        this.user.next(res);
    })
  }

  headersFactory = ()=> {
    return { headers : new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('x-access-token') ? localStorage.getItem('x-access-token') : ""
      })
    }
  }
  
  getUserToken(userData : any){
    return this.http.post('https://localhost:9090/auth/tokens',userData );
  }

  signIn(data){
    return this.http.post('https://localhost:9090/auth/users', JSON.stringify(data), this.headersFactory());
  }  

  checkToken(){
    return this.http.post('https://localhost:9090/auth/check', "" ,this.headersFactory());
  }
}
