import { Component, OnInit } from '@angular/core';
import { PerfilService } from '../../service/perfil.service';
import { Perfil } from '../../domain/perfil';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-perfil-list',
  templateUrl: './perfil-list.component.html',
  styleUrls: ['./perfil-list.component.scss']
})
export class PerfilListComponent implements OnInit {

  prefilList: Perfil[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private perfilService: PerfilService) {

  }

  ngOnInit(): void {

    this.loadPerfis();

  }

  loadPerfis() {

    this.perfilService.findAll().subscribe(res => {
      this.prefilList = res;
    });

  }

  addNewPerfil() {

    this.router.navigate(['./add'], {relativeTo: this.route});

  }
}
