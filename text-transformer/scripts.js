(function(){
    var inputTextElement = document.querySelector('#input-text');
    var outputTextElement = document.querySelector('#output-text');
    var transformTextElement = document.querySelector('#transform-text');
    var errorTextElement = document.querySelector('#error-text');

    function getUrlParams(){
        if (document.location.hash != null && document.location.hash.length > 1){
            return document.location.hash.substring(1);
        }
        // Old method of storing params in query string.
        return document.location.search;
    }

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
        var searchParams = new URLSearchParams(getUrlParams());
        searchParams.set('input', inputTextElement.value);
        searchParams.set('transform', transformTextElement.value);
        // Clear out params from search if there were any (old method of storing params).
        var urlWithoutSearch = document.location.href.replace(document.location.search, '');
        var urlWithoutHash = urlWithoutSearch.replace(document.location.hash, '');
        window.history.replaceState({}, '', `${urlWithoutHash}#${searchParams.toString()}`);
    }

    [inputTextElement, transformTextElement].forEach((input) => {
        input.addEventListener('input', (event) => {
            processTextOrTransformChange();
        });
    });

    // Fill out provided values from URL, if any.
    var searchParams = new URLSearchParams(getUrlParams());
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