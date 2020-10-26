let customerList = ""

customerDelete.onshow=function(){
    drpDelete.clear()
    query = "Select * FROM customer2"
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=klj73571&pass=databasepass1&database=klj73571&query=" + query)

    if (req.status == 200) {            // transit trip worked.
      results = JSON.parse(req.responseText)
          // see if results are correct
      customerList = results
      if (results.length == 0)           // no results were returned by the query
          NSB.MsgBox(`There are no customers in the database.`)
      else {            // query results were returned
          for (i = 0; i < results.length; i++)
            drpDelete.addItem(results[i][1])
      }
    } else   // the transit didn't work - bad wifi? server off?
        //transit error - Handle that with an error message.
        NSB.MsgBox("Error code: " + req.status)
}

btnDelete.onclick=function(){
    let customerDel = inptDelete.value
    // make sure the pet name is in the database before you try to delete it
    let found = ""
    for (i = 0; i <= customerList.length - 1; i++) {
        if (customerDel === customerList[i][1]){
            found = "true"
            break // if found the item in the database jump out of loop
        } else {
            found = "false"
    }
  }
    if (found == "false")
       lblDelete.textContent = "That customer name is not in the database."
    else if (found == "true") {
      query = "DELETE FROM customer2 WHERE name = " + '"' + customerDel + '"'
      req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=klj73571&pass=databasepass1&database=klj73571&query=" + query)
      if (req.status == 200) //transit worked.
            if (req.responseText == 500)    // means the insert succeeded
                lblDelete.textContent = `You have successfully deleted the customer named ${customerDel}`
            else
                lblDelete.textContent = `There was a problem deleting ${customerDel} from the database.`
      else
        // transit error
        lblDel.textContent = `Error: ${req.status}`
      } // found isi true 
}
