import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { 
  Auth, 
  signInWithEmailAndPassword,
  signOut,
  authState,
  User as FirebaseUser,
  UserCredential,
  createUserWithEmailAndPassword
} from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { collection, Firestore, setDoc, doc } from '@angular/fire/firestore';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: Observable<FirebaseUser | null>;
  //isLoggedIn$: Observable<boolean>; // ÚJ

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router
  ) {
    this.currentUser = authState(this.auth);
    //this.isLoggedIn$ = this.currentUser.pipe(map(user => !!user)); // ÚJ
  }

  signIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signOut(): Promise<void> {
    localStorage.setItem('isLoggedIn', 'false');
    return signOut(this.auth).then(() => {
      this.router.navigateByUrl('/');
    });
  }

  // Regisztráció
  async signUp(email: string, password: string, userData: Partial<User>): Promise<UserCredential> {

    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;

      // Itt tárold el a felhasználó adatait a Firestore adatbázisban
      // Például:
      // await setDoc(doc(this.firestore, 'users', user.uid), {
      //   email,
      //   ...userData
      // });

      await this.creteUserData(userCredential.user.uid, {
        ...userData,
        id: userCredential.user.uid,
        email: email,
        devices: [],
        appointments: []
      });


      return userCredential;
    } catch (error) {
      console.error('Hiba a regisztráció során:', error);
      throw error;
    }

  }

  async creteUserData(uid: string, userData: Partial<User>): Promise<void> {
    const userRef = doc(collection(this.firestore, 'Users'), uid);
    
    return setDoc(userRef, userData);
  } 


  isLoggedIn(): Observable<boolean> {
    return this.currentUser.pipe(map(user => !!user));
  }

  updateLoginStatus(isLoggedIn: boolean): void {
    localStorage.setItem('isLoggedIn', isLoggedIn ? 'true' : 'false');
  }
}