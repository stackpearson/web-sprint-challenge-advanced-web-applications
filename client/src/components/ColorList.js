import React, { useState } from "react";
import axios from "axios";
import {axiosWithAuth} from '../utils/axiosWithAuth';


const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, setDependency }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
    .put(`/colors/${colorToEdit.id}`, colorToEdit)
    .then((res) => {
      // console.log('succesful put', res)
      setDependency(true)
      // window.location.href='/bubble-page'
    })
    .catch((res) => {
      console.log('error in put', res)
    })
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
    .delete(`/colors/${colorToEdit.id}`, colorToEdit)
    .then((res) => {
      setDependency(true)
      // console.log('succesful deletion', res)
    })
    .catch((res) => {
      console.log('failed delete', res)
    })
  };

  const addColor = color => {
    axiosWithAuth()
    .post('/colors', colorToEdit)
    .then((res) => {
      console.log('succesful color addition', res)
      setDependency(true)
    })
    .catch((res) => {
      console.log('failed color addition', res)
    })
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li className={editing ? 'color-animation' : 'static-color'} key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className={editing ? 'delete' : 'hide-edit'} onClick={e => {
                    e.stopPropagation();
                    // editColor(color);
                    deleteColor(color);
                    setEditing(false)
                    
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}

      {/* stretch - build another form here to add a color */}

      <form onSubmit={addColor}>
        <legend>Add New Color</legend>

        <label> New Color Name:
        <input
                onChange={e =>
                  setColorToEdit({ ...colorToEdit, color: e.target.value })
                }
                value={colorToEdit.color}
              />
        </label>

        <label> New Hex Code:
        <input
               onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
              />
        </label>
        <div className="button-row">
            <button type="submit">Add Color</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
      </form>
      <div className="spacer" />
      
      

    </div>
  );
};

export default ColorList;
