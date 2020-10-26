customerAdd.onshow=function(){
    drpCustNames.clear()
    let query = "SELECT * FROM customer2"    
    let req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=klj73571&pass=databasepass1&database=klj73571&query=" + query)

    if (req.status == 200) {            // transit trip worked.
      let results = JSON.parse(req.responseText)
          // see if results are correct
          console.log(results)
      if (results.length == 0)           // no results were returned by the query
          NSB.MsgBox(`There are no customers in the database.`)
      else {            // query results were returned
          for (i = 0; i < results.length; i++)
            drpCustNames.addItem(results[i][1])
      }
    } else   // the transit didn't work - bad wifi? server off?
        //transit error - Handle that with an error message.
        NSB.MsgBox("Error code: " + req.status)
}


btnAdd.onclick=function(){
    let query = "INSERT INTO `customer2`(`name`,`street`,`city`,`state`,`zipcode`) VALUES ('Jesse Antiques','1113 F St','Omaha','NE','68178')"    
    let req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=klj73571&pass=databasepass1&database=klj73571&query=" + query)

    if (req.status == 200) { //transit worked.
        if (req.responseText == 500)    // for our server - this means the insert succeeded
            lblAdd.value = "You have successfully added the customer to the database!"
        else
            lblAdd.value = "There was a problem with adding the customer to the database."
    } else 
        // transit error
        lblAdd.value = "Error: " + req.status
}