import init, { format } from '@wasm-fmt/clang-format';

const mainDiv = document.getElementById('main');
const loadingDiv = document.getElementById('loading');
const formatBtn = document.getElementById('formatBtn');
const sourceTextArea = document.getElementById('sourceTextArea');
const formattedTextArea = document.getElementById('formattedTextArea');
const settingsTextArea = document.getElementById('settingsTextArea');
const resetConfiguration = document.getElementById('resetConfiguration');
const copyBtn = document.getElementById('copyBtn');

const defaultSettings = {
    BasedOnStyle: "Microsoft",
    IndentWidth: 4,
    ColumnLimit: 120,
};
const defaultCode = `#include <priority_queue>
#include <unordered_map>

using namespace std ;

class FreqStack{
priority_queue<pair<int, pair<int, int>>> q;
unordered_map<int, int> freq;
int pos=0;
public:
void push(int x){
    q.emplace(++freq[x], make_pair(++pos, x));}

int pop(){
    auto val = q.top();
    q.pop();
    int x = val.second.second;
    freq[x]--;
    return x;}
};

int main(){ FreqStack fs;
fs.push(5); fs.push(7); fs.push(5);
fs.pop();

return 0;
}
`;

formatBtn.addEventListener('click', () => {
    const source = sourceTextArea.value;
    const rawSettings = settingsTextArea.value;
    let formattedSource = "";

    try {
        const settings = JSON.parse(rawSettings);
        formattedSource = format(source, "main.cc", JSON.stringify(settings));
    }
    catch (e) {
        formattedSource = `Invalid JSON provided in settings: ${e}`;
    }

    formattedTextArea.value = formattedSource;
    formattedTextArea.focus();
    formattedTextArea.setSelectionRange(0, 0);
});

resetConfiguration.addEventListener('click', () => {
    settingsTextArea.value = JSON.stringify(defaultSettings, null, 4);
});

copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(formattedTextArea.value);
});

window.addEventListener('load', () => {
    init();
    loadingDiv.style.display = 'none';
    mainDiv.style.display = 'block';
    sourceTextArea.value = defaultCode;
    sourceTextArea.focus();
    settingsTextArea.value = JSON.stringify(defaultSettings, null, 4);
    formattedTextArea.value = "";
});