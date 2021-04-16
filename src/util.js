import sampleData from "@/data/sampleData.json";

var formatForm = sampleData;


function getNewForm(id) {
    formatForm.id = id
    return formatForm;
}



function getFormIndex(array, id) {
    for (var i = 0; i < array.length; i++) {
        if (id === array[i].id) {
            return i;
        }
    }
}

const util = {
    getNewForm,getFormIndex
};
export default util;