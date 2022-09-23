import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: String;
  todoList: any;

  constructor() {
    this.title = 'Todoapp'

    // this.todoList = {
    //   update: false,
    //   tempId: "",
    //   task: "",
    //   todoList: [
    //     {
    //       id: 0,
    //       task: "a",
    //       check: false,
    //     },
    //     {
    //       id: 1,
    //       task: "b",
    //       check: false,
    //     },
    //     {
    //       id: 2,
    //       task: "c",
    //       check: false,
    //     },
    //     {
    //       id: 3,
    //       task: "d",
    //       check: false,
    //     }]
    // }

  }
  ngOnInit(): void {
    console.log("object")
    if (JSON.parse(localStorage.getItem("data")!)) {
      this.todoList = JSON.parse(localStorage.getItem("data")!);
      localStorage.setItem('data', JSON.stringify(this.todoList))

    }
    else {
      this.todoList = {
        update: false,
        tempId: "",
        task: "",
        todoList: []
      }
    }
    console.log(this.todoList)
  }


  handleAddtodo() {
    if (!this.todoList.task) {
      alert("task can't be empty");

    }
    else if (this.todoList.update) {
      console.log(this.todoList.tempId)
      this.todoList.todoList.forEach((item: any) => {
        if (item.id === this.todoList.tempId) {
          item.task = this.todoList.task
        }
      });
      // this.todoList.todoList[this.todoList.tempId].task = this.todoList.task
      this.todoList.task = ""
      this.todoList.tempId = ""
      this.todoList.update = false
    }
    else {
      let id;
      this.todoList.todoList.length === 0
        ? (id = 0)
        : // : (id = this.state.todoList[this.state.todoList.length - 1].id + 1);
        (id = this.todoList.todoList[this.todoList.todoList.length - 1].id + 1);
      const newTodo = {
        id: id,
        task: this.todoList.task,
        check: false,
      };
      this.todoList.todoList.push(newTodo)
      this.todoList.task = ""
    }
    localStorage.setItem('data', JSON.stringify(this.todoList))

    // console.log(this.todoList);

  }
  handleRemove(id: any) {
    this.todoList.todoList = this.todoList.todoList.filter((item: { id: any; }) => item.id !== id)
    localStorage.setItem('data', JSON.stringify(this.todoList))

  }
  handleCheck(id: any) {
    this.todoList.todoList.forEach((item: any) => {
      if (item.id === id) {
        item.check = true
      }
    });
    console.log(this.todoList.todoList)
    localStorage.setItem('data', JSON.stringify(this.todoList))

  }
  handleClear() {
    this.todoList = {
      update: false,
      tempId: "",
      task: "",
      todoList: []
    }
    localStorage.setItem('data', JSON.stringify(this.todoList))

  }
  handleEdit(id: any) {
    const selected = this.todoList.todoList.find((item: { id: any; }) => item.id === id)
    this.todoList.task = selected.task
    this.todoList.update = true
    this.todoList.tempId = selected.id
  }
}


