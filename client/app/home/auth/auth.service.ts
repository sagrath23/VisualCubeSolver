import { Injectable } 		from '@angular/core';
import { Headers, Http } 	from '@angular/http';
import { md5 } 		from './md5';

import 'rxjs/add/operator/toPromise';

import { User } 	from './user';

import { Data } 	from './data';


@Injectable()
export class AuthService {

	private authUrl = 'user';  // URL to web api

	private loggedUser: User;

	private response:any;

	private headers = new Headers({'Content-Type': 'application/json'});

	constructor(private http: Http) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
	    return Promise.reject(error.message || error);
	}

	getSalesPerClientType(): Promise<Data> {
		var me = this,
			serviceUrl = "/sales/getsales";
    	return me.http.get(serviceUrl)
               .toPromise()
               .then((response) =>{
               		me.response = response.json() as Data;
               		console.log(me.response);
               		return me.response;
               	})
               .catch(this.handleError);
  	}

	login(username: string,password: string): Promise<User>{
		const url = `${this.authUrl}/auth`;

		return this.http
    				.post(url, JSON.stringify({username: username, password: md5(password) }), {headers: this.headers})
    				.toPromise()
    				.then((data) => {
							this.loggedUser = data.json() as User;
							console.log(this.loggedUser,'AuthService.login.then');
							return this.loggedUser;
						}).catch(this.handleError);
	}

	logout(sessionId: string): Promise<any>{
		const url = `${this.authUrl}/logout`;
		return this.http
    				.post(this.authUrl, JSON.stringify({sessionId: sessionId}), {headers: this.headers})
    				.toPromise()
    				.then(res => res.json().data)
    				.catch(this.handleError);
	}
}
