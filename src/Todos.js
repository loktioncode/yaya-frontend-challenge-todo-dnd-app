import React, { Component } from 'react';
import './App.css';


export default class AppDragDropDemo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: null,
             tasks: [
                {name:"Water my Garden",category:"inprogress", statuscolor: "skyblue"},
                {name:"Yaya Coding Challenge 2", category:"inprogress", statuscolor:"skyblue"},
                {name:"Yaya Coding Challenge 1", category:"complete", statuscolor:"#77dd77"}
              ]
            };

            this.addItem = this.addItem.bind(this);
            this.onDelete = this.onDelete.bind(this);
    }

    addItem(e){
        console.log(this.state.items);

        if (this._inputElement.value !== "") {
            var newItem = {
            name:this._inputElement.value,
            category:"inprogress",
            statuscolor:"skyblue"
            };

            // console.log("passed");
         
            this.setState((prevState) => {
            // console.log("passedstate");
              return { 
                tasks: prevState.tasks.concat(newItem) 
              };
            });
           
            this._inputElement.value = "";
          }
           
          console.log(this.state.items);
             
          e.preventDefault();
    }

    onDragStart = (ev, id) => {
        console.log('dragstart:',id);
        ev.dataTransfer.setData("id", id);
    }

    onDelete = (key) => {
        console.log('delete:',key);
       
        var filteredItems = this.state.tasks.filter(function (item) {
            return (item["name"] !== key);
          });

          this.setState({
            tasks: filteredItems
          });
    }

    onDragOver = (ev) => {
        ev.preventDefault();
    }

    onDrop = (ev, cat) => {
       let id = ev.dataTransfer.getData("id");
       
       let tasks = this.state.tasks.filter((task) => {
           if (task.name === id && cat === "complete" ) {
               task.category = cat;
               task.statuscolor = "#77dd77";
           }else if (task.name === id && cat === 'inprogress'){
                task.category = cat;
                task.statuscolor = "skyblue";
           }
           return task;
       });

       this.setState({
           ...this.state,
           tasks
       });
    }

    

    render() {
        var tasks = {
            inprogress: [],
            complete: []
        }

        this.state.tasks.forEach ((t) => {
            tasks[t.category].push(
                <div key={t.name} 
                    onDragStart = {(e) => this.onDragStart(e, t.name)}
                    draggable
                    className="draggable "
                    style = {{backgroundColor: t.statuscolor}}
                >
                    <div className="wrap"> <span className="close" onClick={() => this.onDelete(t.name)}>&times;</span></div>
                    
                    {t.name}
                </div>
            );
        });

        return (
            <div className="container-drag">
                <div className="header">
                <h2 >Yaya Kanban Demo</h2>
                        <form>
                        <input
                            type='text'
                            ref={(a) => this._inputElement = a}
                            placeholder="Enter todo ..."
                        />
                        <button type="submit" onClick={this.addItem}>Add todo</button>
                    </form>
                </div> 

                <div className="inprogress"
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>{this.onDrop(e, "inprogress")}}>
                    <span className="task-header">IN PROGRESS</span>
                    {tasks.inprogress}
                </div>

                <div className="droppable" 
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>this.onDrop(e, "complete")}>
                     <span className="task-header">COMPLETED</span>
                     {tasks.complete}
                </div>


            </div>
        );
    }
}
