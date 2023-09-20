package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
)

func fetchContentFromURL(url string) ([]byte, error) {
	response, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer response.Body.Close()

	return ioutil.ReadAll(response.Body)
}

func fetchAndSendContent(url string, ch chan<- []byte) {
	content, err := fetchContentFromURL(url)
	if err != nil {
		ch <- []byte{}
		return
	}
	ch <- content
}

func aggregateContentSize(channels []chan []byte) int {
	totalSize := 0
	for _, ch := range channels {
		content := <-ch
		totalSize += len(content)
	}
	return totalSize
}

func main() {
	urls := os.Args[1:]

	if len(urls) == 0 {
		fmt.Println("Please provide a list of URLs as arguments.")
		return
	}

	channels := make([]chan []byte, len(urls))
	for i, url := range urls {
		channels[i] = make(chan []byte)
		go fetchAndSendContent(url, channels[i])
	}

	totalSize := aggregateContentSize(channels)
	fmt.Printf("Total bytes fetched: %d\n", totalSize)
}
