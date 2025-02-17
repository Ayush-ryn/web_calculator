let disp = "";
function show()
{
    document.getElementById("screen").innerHTML = disp;
}

function calculate()
{
    function precedence(op) 
    {
        return op === '+' || op === '-' ? 1 : 2;
    }

    function infixToPostfix(expression) 
    {
        let output = [];
        let operators = [];
        let tokens = expression.match(/\d+(\.\d+)?|[+\-*/]/g);
        
        tokens.forEach(token =>
        {
            if (!isNaN(token)) 
            {
                output.push(token);
            }
            else
            {
                while (operators.length && precedence(operators[operators.length - 1]) >= precedence(token)) 
                {
                    output.push(operators.pop());
                }
                operators.push(token);
            }
        });
        
        while (operators.length) 
        {
            output.push(operators.pop());
        }
        
        return output;
    }
    
    function evaluatePostfix(postfix) 
    {
        let stack = [];
        postfix.forEach(token => {
            if (!isNaN(token)) {
                stack.push(Number(token));
            } else {
                let b = stack.pop();
                let a = stack.pop();
                stack.push(token === '+' ? a + b : token === '-' ? a - b : token === '*' ? a * b : a / b);
            }
        });
        return stack.pop();
    }
    
    let postfix = infixToPostfix(disp);
    disp = evaluatePostfix(postfix);
    disp = disp.toString();
}

function func(text)
{
    if (text=="AC")
    {
        disp = "";
        show();
    }
    else if (text=="C")
    {
        disp = disp.slice(0,disp.length-1);
        show();
    }
    else if (text=="=")
    {
        calculate();
        show();
    }
    else
    {
        disp += text;
        show();
    }
}
let buttons = document.getElementsByClassName("btn");   
for (let i = 0; i < buttons.length; i++) 
{
    buttons[i].onclick = function()
    {
        func(this.innerText);
    }
}