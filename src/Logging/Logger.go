package Logging

import (
	"fmt"
	"os"
	"time"
)

func Write(entry string, location string) {
	f, err := os.OpenFile("C:\\Log\\Architech\\"+location+".txt", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		fmt.Printf("Failed to open log file")
	}
	defer f.Close()

	if _, err := f.Write([]byte(time.Now().Format(time.RFC822) + ": " + entry + "\n")); err != nil {
		fmt.Printf("Failed to append entry log file")
	}
	if err := f.Close(); err != nil {
		fmt.Printf("Failed to close log file")
	}
}
