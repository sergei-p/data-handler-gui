const {ipcRenderer} = require('electron')
const submitData = () => {

  const form = document.getElementById("urlSumibtForm")

  filePathsObj = {
    concentrationPath: form.elements[0].value, 
    backpressurePath: form.elements[1].value,
    sprayFilmBudgeting: form.elements[2].value,
    cfdSimulationResult:  form.elements[3].value,
  }

  // Verify that there are no empty fields
  let emptyFieldExists = false
  for(const value in filePathsObj) {
    if(filePathsObj[value] === "") {
      emptyFieldExists = true
    }
  }

  if(!emptyFieldExists){
    ipcRenderer.send("msg", filePathsObj)
  } else {
    alert("Error: Empty Field")
  }
}
