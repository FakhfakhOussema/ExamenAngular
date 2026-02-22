import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MemberService } from 'src/services/member.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Member } from '../Modeles/Member';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css'],
})
export class MemberFormComponent implements OnInit {

  form!: FormGroup;
  idcourant!: string | null;
  members: Member[] = []; // Pour rafraîchir la liste après suppression

  constructor(
    private Ms: MemberService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idcourant = this.activateRoute.snapshot.params['id'];

    if (this.idcourant) {
      // Mode édition
      this.Ms.getMemberById(this.idcourant).subscribe({
        next: (data) => {
          this.form = new FormGroup({
            cin: new FormControl(data.cin),
            name: new FormControl(data.name),
            type: new FormControl(data.type),
            cv: new FormControl(data.cv),
            createdDate: new FormControl(data.createdDate),
          });
        },
      });
    } else {
      // Mode ajout
      this.form = new FormGroup({
        cin: new FormControl(null),
        name: new FormControl(null),
        type: new FormControl(null),
        cv: new FormControl(null),
        createdDate: new FormControl(null),
      });
    }

    // Charger tous les membres pour afficher la table
    this.loadMembers();
  }

  loadMembers(): void {
    this.Ms.getAllMembers().subscribe({
      next: (data) => this.members = data
    });
  }

  onSubmit(): void {
    if (this.idcourant) {
      // Mise à jour
      this.Ms.updateMember(this.idcourant, this.form.value).subscribe({
        next: () => this.router.navigate(['/members']),
        error: (err) => console.error('Error updating member:', err)
      });
    } else {
      // Ajout
      this.Ms.ADDMember(this.form.value).subscribe({
        next: () => this.router.navigate(['/members']),
        error: (err) => console.error('Error adding member:', err)
      });
    }
  }

  

}
