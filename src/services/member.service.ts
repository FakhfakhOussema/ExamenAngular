import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Member } from 'src/app/Modeles/Member';  

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private baseUrl = "http://localhost:3000/Members";

  constructor(private http: HttpClient) { }

  // Récupérer tous les membres
  getAllMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.baseUrl);
  }

  // Ajouter un membre
  ADDMember(m: Member): Observable<Member> {
    return this.http.post<Member>(this.baseUrl, m);
  }

  // Récupérer un membre par ID
  getMemberById(id: string): Observable<Member> {
    return this.http.get<Member>(`${this.baseUrl}/${id}`);
  }

  // Mettre à jour un membre
  updateMember(id: string, m: Member): Observable<Member> {
    return this.http.put<Member>(`${this.baseUrl}/${id}`, m);
  }

  // Supprimer un membre
  deleteMemberById(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

}
