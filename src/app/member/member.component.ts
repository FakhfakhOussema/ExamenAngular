import { Component } from '@angular/core';
import { Member } from '../Modeles/Member';
import { MemberService } from 'src/services/member.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent {

  constructor(private Ms: MemberService) {}

  dataSource: Member[] = [];

  // Noms EXACTS des colonnes définies dans le HTML
  displayedColumns: string[] = [
    'id',
    'cin',
    'name',
    'type',
    'cv',
    'createdDate',
    'actions'
  ];


  ngOnInit(): void {
    this.Ms.getAllMembers().subscribe(data => {
      this.dataSource = data;
    });
  }
  loadMembers(): void {
    this.Ms.getAllMembers().subscribe({
      next: (data) => this.dataSource = data
    });
  }

  deleteMember(id: string): void {
    this.Ms.deleteMemberById(id).subscribe({
      next: () => this.loadMembers(),
      error: (err) => console.error('Error deleting member:', err)
    });
  }
  
}
