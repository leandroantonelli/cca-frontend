import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { User } from '../../domain/user';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogConfirmService } from '../../../../core/components/dialog/confirm/service/dialog-confirm.service';
import { LoadingService } from '../../../../core/components/loading/service/loading.service';
import { MessageService } from '../../../../core/components/message/service/message.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  columnsUser: string[] = ['name', 'email', 'cellfone', 'cpf', 'perfil', 'active', 'id'];
  userList: User[] = [];


  constructor(private router: Router,
              private route: ActivatedRoute,
              private userService: UserService,
              private dialogConfirmService: DialogConfirmService,
              private loadingService: LoadingService,
              private messageService: MessageService) {
  }

  ngOnInit() {

    this.loadUsers();

  }

  loadUsers() {

    this.userService.findAll().subscribe(res => {
      this.userList = res;
    });

  }

  addUser() {
    this.router.navigate(['./add'], {relativeTo: this.route});
  }

  editUser(user: User) {
    this.router.navigate(['./', user.idUser], {relativeTo: this.route});
  }

  deleteUser(user: User) {
    this.dialogConfirmService.show('Remover', 'Deseja remover o Usuário?', '350px').subscribe(result => {
      if (result) {
        this.loadingService.start('Removendo Atributo');
        this.userService.delete(user.idUser).subscribe(() => {
          this.loadUsers();
          this.loadingService.done();
        }, err => {
          this.loadingService.done();
          this.messageService.show(err.error.message);
        });
      }
    });
  }

}
