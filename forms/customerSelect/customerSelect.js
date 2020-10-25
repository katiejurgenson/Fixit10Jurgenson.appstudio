let allCustomers = ['']

customerSelect.onshow=function(){
    drpCustomers.clear()
    query = "SELECT * FROM customer2"
    // Below change from my netID to yours (twice: user and database)    
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=klj73571&pass=" + pw + "&database=klj73571&query=" + query)

    if (req.status == 200) {            // transit trip worked.
      results = JSON.parse(req.responseText)
          // see if results are correct
          console.log(results)
          allCustomers = results
      if (results.length == 0)           // no results were returned by the query
          NSB.MsgBox(`There are no customers in the database.`)
      else {            // query results were returned
          for (i = 0; i < results.length; i++)
            drpCustomers.addItem(results[i][1])
      }
    } else   // the transit didn't work - bad wifi? server off?
        //transit error - Handle that with an error message.
        NSB.MsgBox("Error code: " + req.status)
}

drpCustomers.onclick=function(c){
    if (typeof(c) == "object"){  // means control clicked but no selection made yet
      return                     // do nothing
    } else {
      drpCustomers.value = c
      let message  = ""
      for (i = 0; i < allCustomers.length; i++)
        if (c == allCustomers[i][1])
          custState = allCustomers[i][4]
      for (i = 0; i < allCustomers.length; i++)
        if (custState == allCustomers[i][4])
          message = message + allCustomers[i][1] + "\n"
        txtOutput.value = `The following customers are all located in ${custState}: \n${message}`
    }
}