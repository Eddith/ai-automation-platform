package main

import (
    "encoding/json"
    "net/http"
    "os"
    "bytes"
    "io/ioutil"
)

type PromptRequest struct {
    Prompt string `json:"prompt"`
}

func handler(w http.ResponseWriter, r *http.Request) {
    var input PromptRequest
    json.NewDecoder(r.Body).Decode(&input)

    body, _ := json.Marshal(map[string]interface{}{
        "model": "gpt-3.5-turbo",
        "messages": []map[string]string{
            {"role": "user", "content": input.Prompt},
        },
    })

    req, _ := http.NewRequest("POST", "https://api.openai.com/v1/chat/completions", bytes.NewBuffer(body))
    req.Header.Set("Authorization", "Bearer "+os.Getenv("OPENAI_API_KEY"))
    req.Header.Set("Content-Type", "application/json")

    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        http.Error(w, err.Error(), 500)
        return
    }
    defer resp.Body.Close()

    result, _ := ioutil.ReadAll(resp.Body)
    w.Write(result)
}

func main() {
    http.HandleFunc("/ask", handler)
    http.ListenAndServe(":8080", nil)
}
