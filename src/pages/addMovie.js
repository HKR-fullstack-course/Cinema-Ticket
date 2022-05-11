import React from 'react'
import addMovie_style from "../style/addMovie.css" 

const addMovie = () => {
  return (

    <>
     <form class="signup-form" action="/addMovie" method="post">

        <div class="form-header">
        <h1>Add a new movie</h1>
        <img src={require('../images/addLogo.png')}  alt="Addicon" id="Addicon"/>
        </div>

        <div class="form-body">

        <div class="horizontal-group">
            <div class="form-group left">
            <label for="Title" class="label-title">Title *</label>
            <input type="text" id="title" class="form-input" placeholder="Enter the Title of the movie" required="required" />
            </div>
            <div class="form-group right">
            <label for="ReleaseDate" class="label-title">Release Date</label>
            <input type="date" id="releaseDate" class="form-input" placeholder="Enter the year of release of the movie" min="1900" max="2023" />
            </div>
        </div>

        <div class="form-group">
            <label for="director" class="label-title">Director*</label>
            <input type="text" id="Director" class="form-input" placeholder="Enter the name of the director" required="required"/>
        </div>

        <div class="horizontal-group">
            <div class="form-group left">
            <label for="text" class="label-title">Length of the movie*</label>
            <input type="text" id="length" class="form-input" placeholder="Enter how long is the movie" required="required"/>
            </div>
            <div class="form-group right">
            <label for="budget" class="label-title">Budget *</label>
            <input type="text" class="form-input" id="budget" placeholder="Enter the budget of the movie" required="required" />
            </div>
        </div>

        <div class="horizontal-group">
            <div class="form-group left">
            <label class="label-title">Actors :</label>
            <input type="text" class="form-input" id="leadActor" placeholder="Enter the name of the lead actor" required="required" />
            <button class="add_field_button">Add more +</button>
            </div>
            <div class="form-group right">
            <label class="label-title">Genre :</label>
            <div >
                <label><input type="checkbox" value="Web"/>Comedy</label>
                <label><input type="checkbox" value="iOS"/>Action</label>
                <label><input type="checkbox" value="Andriod"/>Musical</label>
                <label><input type="checkbox" value="Game"/>Other</label>
            </div>
            </div>
        </div>


        <div class="horizontal-group">
    
           
            <div class="form-group right" >
                <label class="label-title">Choose screening time :</label>
                <input type="datetime-local" id="meeting-time"
                name="meeting-time" 
                 min="2022-05-07T00:00" max="2024-12-31T00:00"></input>
            </div>
        </div>


        <div class="horizontal-group">
                <div class="form-group left" >
                <label for="choose-file" class="label-title">Upload Movie Poster</label>
                <input type="file" id="choose-file" size="80" accept="image/png, image/gif, image/jpeg"/>
                </div>
                <div class="form-group right">
                    <label for="experience" class="label-title">Age minimum</label>
                    <input type="number" min="3" max="18"  placeholder="3" class="form-input"/>
                </div>
        </div>
        <div class="form-group" >
            <label class="label-title">Box office Rating</label>
            <select class="form-input" id="Rating" >
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>

            </select>
        </div>
            <div class="form-group">
                <label class="label-title">Synopsis</label>
                <textarea class="form-input" rows="4" cols="50" id="synopsis"></textarea>
            </div>
            
         </div>
        

        <div class="form-footer">
        <span>* required</span>
        <button type="submit" class="btn">Add Movie</button>
        </div>

    

    </form>



    </>
        
      
    

  )
}

export default addMovie
