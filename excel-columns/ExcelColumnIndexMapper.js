class ExcelColumnIndexMapper
{
    static #generateMappingsIfNeeded(){
        if (!this.#indexToExcelMapping){
            this.#indexToExcelMapping = this.#generateColumnIndexToExcelColumnNameMappings();
            this.#excelToIndexMapping = this.#reverseMap(this.#indexToExcelMapping);
        }
    }

    static #indexToExcelMapping;
    static #excelToIndexMapping;

    static getExcelColumnNameForIndex(index){
        this.#generateMappingsIfNeeded();
        return this.#indexToExcelMapping[index];
    }

    static getIndexForExcelColumnName(excelColumnName){
        this.#generateMappingsIfNeeded();
        return parseInt(this.#excelToIndexMapping[excelColumnName]);
    }
    
    static #convertIndexToCharacter(index){
        // The index of the ASCII character 'A'
        const aIndex = 65;

        if(index < 0 || index > 25){
            throw "index must be between 0 and 25";
        }

        return String.fromCharCode(index + aIndex);
    }

    static #generateColumnIndexToExcelColumnNameMappings(){
        // Generate 1 character mappings (e.g. A, B, C, etc.)
        var oneCharMappings = {};
        for (var i = 0; i < 26; i++){
            oneCharMappings[i] = this.#convertIndexToCharacter(i);
        }

        // Generate 2 character mappings (e.g. AA, AB, AC, etc.)
        var twoCharMappings = {};
        var index = 26;
        for (var firstCharMappingProperty in oneCharMappings){
            for (var secondCharMappingProperty in oneCharMappings){
                twoCharMappings[index++] = oneCharMappings[firstCharMappingProperty] + oneCharMappings[secondCharMappingProperty];
            }
        }

        var threeCharMappings = {};
        // Generate 3 character mappings (e.g. AAA, AAB, AAC, etc.)
        for (var twoCharMappingProperty in twoCharMappings){
            for (var oneCharMappingProperty in oneCharMappings){
                threeCharMappings[index++] = twoCharMappings[twoCharMappingProperty] + oneCharMappings[oneCharMappingProperty];
            }
        }

        var results = {};
        Object.assign(results, oneCharMappings);
        Object.assign(results, twoCharMappings);
        Object.assign(results, threeCharMappings);
        
        // Remove invalid mappings (beyond what Excel supports)
        const maxExcelColumnIndex = 16383;
        for (var resultProperty in results){
            if (resultProperty > maxExcelColumnIndex){
                delete results[resultProperty];
            }
        }

        return results;
    }

    static #reverseMap(mappingObject){
        var result = {};
        for (var property in mappingObject){
            var value = mappingObject[property];
            result[value] = property;
        }
        return result;
    }
}

if(typeof module !== 'undefined') {
    module.exports = ExcelColumnIndexMapper;
}