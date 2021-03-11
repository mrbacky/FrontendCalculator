//  comment
//  comment
// comment

//https://localhost:5001
// function calculate() {
//     var number1 = parseFloat($("#number1").val());
//     var number2 = parseFloat($("#number2").val());
//     var operator = $("#operator").val();
//     var equation = number1 + operator + number2;

//     var result = eval(equation);
//     $("#result").val(result);
// }

// function reset(id) {
//     $("#" + id + "> .form-control").clear();
// }

// var f = [];
// function factorial(n) {
//     if (n == 0 || n == 1) {
//         return 1;
//     }
//     if (f[n] > 0) {
//         return f[n];
//     }
//     return f[n] = factorial(n - 1) * n;
// }

// function calculateFactorial() {
//     var n = parseInt($("#fact-number").val());
//     if (n > 69) {
//         $("#fact-result").val("Infinity");
//     }
//     else {
//         var result = factorial(n);
//         $("#fact-result").val(result);
//     }

// }
async function postData(url = '', data) {
    $("#error").val('errors will be displayed here');
    const prefix = 'http://backend-host-5:5555/api/';
    url = prefix + url;
      const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
      if (response.ok) {
        return response.json();
      } else {
        //throw new Error('Something went wrong');
        showError(response.statusText);
      }
      //return response.json(); // parses JSON response into native JavaScript objects
    }

    function showError(err){
        console.log(err);
        //$("#error").val(err);
    }

    function reset(id) {
        $("#" + id + "> .form-control").clear();
    }

    function calculate(){
        var operator = $("#operator").val();
        var numbers = [];
        let num = parseFloat($("#number1").val());
        let num2 = parseFloat($("#number2").val());
        numbers.push(num);
        numbers.push(num2);

        if (isNaN(num) || isNaN(num2)) { return; }

        switch (operator) {
            case '+':
                postData('add', numbers )
                .then(data => {
                  console.log(data); // JSON data parsed by `data.json()` call
                  $("#result").val(data)
                });
                break;
            case '-':
                postData('subtract', numbers )
                .then(data => {
                  console.log(data); // JSON data parsed by `data.json()` call
                  $("#result").val(data)
                });
                break;
            case '*':
                postData('multiply', numbers )
                .then(data => {
                    console.log(data); // JSON data parsed by `data.json()` call
                    $("#result").val(data)
                });
                break;
            case '/':
                if (num2 < 1) {
                    $("#result").val("Infinity")
                    return;
                }
                postData('divide', numbers )
                .then(data => {
                    console.log(data); // JSON data parsed by `data.json()` call
                    $("#result").val(data)
                });
                break;
            case '^':
                postData('power', numbers )
                .then(data => {
                    console.log(data); // JSON data parsed by `data.json()` call
                    $("#result").val(data)
                });
                break;
        
            default:
                showError('bad operator')
                break;
        }
    }

    function calculateFactorial() {
        let num = parseFloat($("#fact-number").val());
        if (num > 69) {
            $("#fact-result").val("Infinity");
            return;
        }
        postData('factorial', num )
            .then(data => {
                console.log(data); // JSON data parsed by `data.json()` call
                $("#fact-result").val(data);
            });
    }