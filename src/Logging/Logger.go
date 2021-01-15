package Logging

import (
	"fmt"
	"os"
	"time"
)

type Logger struct {
	Location string
	file     string
}

func New(file string) Logger {
	logger := Logger{"C:\\Log\\Agg", file}
	return logger
}

func Write(entry string, location string) {
	f, err := os.OpenFile("C:\\Log\\Agg"+location+".txt", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	defer f.Close()

	if err != nil {
		fmt.Printf("Failed to open log file")
	}
	if _, err := f.Write([]byte(time.Now().Format(time.RFC822) + ": " + entry + "\n")); err != nil {
		fmt.Printf("Failed to append entry log file")
	}
	if err := f.Close(); err != nil {
		fmt.Printf("Failed to close log file")
	}