customerUpdate.onshow=function(){
    selToChange.clear()
    // get the data to populate the dropdown with names from database
    let query = "SELECT * FROM customer2"
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=klj73571&pass=databasepass1&database=klj73571&query=" + query)
    
    if (req.status == 200) {            // transit trip worked.
    results = JSON.parse(req.responseText)
        // see if results are correct
        console.log(results)
      if (results.length == 0)           // no results were returned by the query
          NSB.MsgBox(`There are no customers in the database.`)
      else {            // query results were returned
          for (i = 0; i < results.length; i++)
            selToChange.addItem(results[i][1])
      }
  } else   // the transit didn't work - bad wifi? server off?
      //transit error - Handle that with an error message.
      NSB.MsgBox("Error code: " + req.status)
}

btnUpdate.onclick=function(){
    let newName = inptUpdate.value
    let oldName = selToChange.value
   
    let found = ""
    for (i = 0; i <= results.length - 1; i++) {
      console.log(results[i][1])
      console.log(oldName)
        // console.log(`FOUND IS false and name is ${results[i]}`)
        if (oldName == results[i][1]) {
            found = true
            break
          } else {
            found = false
          }
     }  
    if (found == false)
       NSB.MsgBox("That customer name is not in the database.")
    else if (found == true) {
        query = "UPDATE customer2 SET name =" + '"' + newName + '"' + " WHERE name = " + '"' + oldName + '"'
        //alert(query)
        req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=klj73571&pass=databasepass1&database=klj73571&query=" + query)

        if (req.status == 200) { //transit worked.
            if (req.responseText == 500) {   // means the update succeeded
                NSB.MsgBox(`You have successfully changed the customer name!`)
                // reset controls to original state
                inptUpdate.value = ""
                selToChange.value = ""
            } else
                NSB.MsgBox(`There was a problem changing the customer name.`)
        } else
            // transit error
            NSB.MsgBox(`Error: ${req.status}`);
    } // found is true
}
