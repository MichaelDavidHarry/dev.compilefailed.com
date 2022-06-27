(function(){
    var inputTextElement = document.querySelector('#input-text');
    var outputTextElement = document.querySelector('#output-text');
    var transformTextElement = document.querySelector('#transform-text');
    var errorTextElement = document.querySelector('#error-text');

    function processTextOrTransformChange(){
        var transformCode = transformTextElement.value;
        var inputText = inputTextElement.value;
        var transformFunction = null;
        var error = '';
        try{
            transformFunction = Function(`return (input) => {${transformCode}}`)();
        }
        catch(e){
            error = e;
        }
        var output = '';
        
        if(!error){
            try{
                var output = transformFunction(inputText);
            }
            catch(e){
                error = e;
            }
        }
        outputTextElement.value = output;
        errorTextElement.value = error;

        updateUrl();
    }

    function updateUrl(){
        var searchParams = new URLSearchParams(document.location.search);
        searchParams.set('input', inputTextElement.value);
        searchParams.set('transform', transformTextElement.value);
        var urlWithoutSearch = document.location.href.replace(document.location.search, '');
        window.history.replaceState({}, '', `${urlWithoutSearch}?${searchParams.toString()}`);
    }

    [inputTextElement, transformTextElement].forEach((input) => {
        input.addEventListener('input', (event) => {
            processTextOrTransformChange();
        });
    });

    // Fill out provided values from URL, if any.
    var searchParams = new URLSearchParams(document.location.search);
    var input = searchParams.get("input");
    if(input){
        inputTextElement.value = input;
    }
    var transform = searchParams.get("transform");
    if(transform){
        transformTextElement.value = transform;
    }
    if(input || transform){
        processTextOrTransformChange();
    }
})();