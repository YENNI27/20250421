let animals = [];
let blossoms = [];
let buttons = ["首頁", "自我介紹", "作品集", "測驗卷", "教學影片"];
let buttonY;
let iframe; // To store the iframe element
let introDiv; // To store the introduction popup
let portfolioDiv; // To store the portfolio popup
let weekIframe; // To store the iframe for weekly assignments
let quizDiv; // To store the quiz popup
let hearts = []; // Array to store heart positions and sizes

function setup() {
  createCanvas(windowWidth, windowHeight); // Fullscreen canvas
  noCursor(); // Hide the default cursor
  textSize(80);
  textAlign(CENTER, CENTER);
  buttonY = height / 2 - (buttons.length * 50) / 2; // Center buttons vertically

  // Initialize floating animals
  for (let i = 0; i < 5; i++) {
    animals.push({
      x: random(width),
      y: random(height / 2),
      speed: random(0.5, 2),
    });
  }

  // Initialize falling cherry blossoms
  for (let i = 0; i < 50; i++) {
    blossoms.push({
      x: random(width),
      y: random(-height, 0),
      speed: random(1, 3),
    });
  }

  // Initialize hearts
  for (let i = 0; i < 50; i++) {
    hearts.push({
      x: random(width),
      y: random(height),
      size: random(10, 30),
      speed: random(1, 3),
    });
  }
}

function draw() {
  background(255, 182, 193); // Pink background

  // Draw floating animals
  fill(255);
  for (let animal of animals) {
    ellipse(animal.x, animal.y, 40, 40); // Replace with animal images if available
    animal.y += animal.speed;
    if (animal.y > height) animal.y = 0; // Reset position
  }

  // Draw falling cherry blossoms
  fill(255, 192, 203);
  for (let blossom of blossoms) {
    drawBlossom(blossom.x, blossom.y); // Custom cherry blossom shape
    blossom.y += blossom.speed;
    if (blossom.y > height) blossom.y = random(-height, 0); // Reset position
  }

  // Draw floating hearts
  for (let heart of hearts) {
    drawHeart(heart.x, heart.y, heart.size + map(mouseX, 0, width, -5, 5)); // Adjust size based on mouseX
    heart.y += heart.speed; // Move heart downward
    if (heart.y > height) {
      heart.y = 0; // Reset position to the top
      heart.x = random(width); // Randomize x position
    }
  }

  // Draw UI elements (buttons, etc.)
  drawUI();

  // Draw Mickey Mouse cursor
  drawMickeyMouseCursor(mouseX, mouseY);
}

// Function to draw a cherry blossom shape
function drawBlossom(x, y) {
  push();
  translate(x, y);
  fill(255, 192, 203);
  noStroke();
  for (let i = 0; i < 5; i++) {
    ellipse(0, 10, 15, 30);
    rotate(PI / 2.5);
  }
  pop();
}

// Function to draw a Mickey Mouse cursor
function drawMickeyMouseCursor(x, y) {
  push();
  translate(x, y); // Move to the mouse position

  // Draw Mickey's head (large circle)
  fill(0); // Black color
  noStroke();
  ellipse(0, 0, 30, 30); // Head

  // Draw Mickey's ears (two smaller circles)
  ellipse(-15, -15, 20, 20); // Left ear
  ellipse(15, -15, 20, 20); // Right ear

  pop();
}

// Function to draw a heart shape
function drawHeart(x, y, size) {
  push();
  translate(x, y);
  fill(255, 105, 180); // Pink color for the heart
  noStroke();
  beginShape();
  vertex(0, -size / 2);
  bezierVertex(size / 2, -size, size, size / 3, 0, size);
  bezierVertex(-size, size / 3, -size / 2, -size, 0, -size / 2);
  endShape(CLOSE);
  pop();
}

// Function to draw UI elements (buttons, etc.)
function drawUI() {
  // Draw buttons on the right side
  textSize(20);
  for (let i = 0; i < buttons.length; i++) {
    let buttonX = width - 150; // Position buttons near the right edge
    let buttonYPosition = buttonY + i * 60; // Add spacing between buttons

    // Check if the mouse is hovering over the button
    let isHovering =
      mouseX > buttonX - 60 &&
      mouseX < buttonX + 60 &&
      mouseY > buttonYPosition - 20 &&
      mouseY < buttonYPosition + 20;

    // Change colors based on hover state
    if (isHovering) {
      fill("#fdffb6"); // Inner color when hovering
      stroke("#a0c4ff"); // Border color when hovering
    } else {
      fill("#ff4d6d"); // Default inner color
      stroke("#0ad6ff"); // Default border color
    }

    strokeWeight(2);
    rectMode(CENTER);
    rect(buttonX, buttonYPosition, 120, 40, 10); // Button background with rounded corners

    noStroke();
    fill(0); // Text color
    text(buttons[i], buttonX, buttonYPosition);

    // Check if the mouse is pressed over a button
    if (
      mouseIsPressed &&
      mouseX > buttonX - 60 &&
      mouseX < buttonX + 60 &&
      mouseY > buttonYPosition - 20 &&
      mouseY < buttonYPosition + 20
    ) {
      handleButtonClick(i); // Handle button click
    }
  }
}

// Function to handle button clicks
function handleButtonClick(index) {
  if (index === 0) {
    // "首頁" button clicked
    window.open("https://hackmd.io/@Q0Ml4RVpSFC-KaLHx8H5Pw/rk3ZJ0lAJl", "_blank");
  } else if (index === 1) {
    // "自我介紹" button clicked
    if (!introDiv) {
      introDiv = createDiv("大家好，我是教科一B胡妍妮。");
      introDiv.style("font-size", "20px");
      introDiv.style("color", "#000");
      introDiv.style("background-color", "#fff");
      introDiv.style("padding", "20px");
      introDiv.style("border", "2px solid #000");
      introDiv.style("border-radius", "10px");
      introDiv.position(width / 2 - 150, height / 2 - 50); // Center the popup

      // Add a close button to remove the introduction popup
      let closeButton = createButton("關閉");
      closeButton.style("position", "absolute");
      closeButton.style("top", `${height / 2 - 100}px`); // Position above the introDiv
      closeButton.style("left", `${width / 2 + 150}px`); // Position to the right of the introDiv
      closeButton.style("padding", "10px");
      closeButton.style("background-color", "#ff6666");
      closeButton.style("color", "#fff");
      closeButton.style("border", "none");
      closeButton.style("border-radius", "5px");
      closeButton.style("cursor", "pointer");

      closeButton.mousePressed(() => {
        if (introDiv) {
          introDiv.remove(); // Remove the introduction popup
          introDiv = null;
        }
        closeButton.remove(); // Remove the close button
      });
    }
  } else if (index === 2) {
    // "作品集" button clicked
    if (!portfolioDiv) {
      portfolioDiv = createDiv();
      portfolioDiv.style("width", "250px");
      portfolioDiv.style("height", "auto");
      portfolioDiv.style("background-color", "#fefae0"); // Light pastel background
      portfolioDiv.style("border", "3px solid #ffafcc"); // Pink border
      portfolioDiv.style("border-radius", "15px"); // Rounded corners
      portfolioDiv.style("padding", "15px");
      portfolioDiv.style("box-shadow", "0px 4px 8px rgba(0, 0, 0, 0.2)"); // Add shadow
      portfolioDiv.style("position", "fixed"); // Make it float
      portfolioDiv.style("top", "100px"); // Distance from the top
      portfolioDiv.style("right", "30px"); // Distance from the right side
      portfolioDiv.style("font-family", "'Comic Sans MS', cursive, sans-serif"); // Cute font

      // Add a title to the portfolio
      let title = createP("🎨 我的作品集");
      title.style("font-size", "20px");
      title.style("color", "#ff6f91"); // Pink text
      title.style("text-align", "center");
      title.style("margin-bottom", "10px");
      title.parent(portfolioDiv);

      // Add buttons for each week
      let weeks = ["第一周作業", "第二周作業", "第三周作業", "第四周作業"];
      for (let i = 0; i < weeks.length; i++) {
        let weekButton = createButton(weeks[i]);
        weekButton.parent(portfolioDiv);
        weekButton.style("margin", "5px 0");
        weekButton.style("width", "100%"); // Make buttons full width
        weekButton.style("padding", "10px");
        weekButton.style("background-color", "#ffafcc"); // Light pink background
        weekButton.style("color", "#fff");
        weekButton.style("border", "none");
        weekButton.style("border-radius", "10px");
        weekButton.style("cursor", "pointer");
        weekButton.style("font-size", "16px");
        weekButton.style("transition", "transform 0.2s, background-color 0.2s"); // Add hover effect

        // Hover effect for buttons
        weekButton.mouseOver(() => {
          weekButton.style("background-color", "#f48fb1"); // Darker pink on hover
          weekButton.style("transform", "scale(1.05)"); // Slightly enlarge on hover
        });
        weekButton.mouseOut(() => {
          weekButton.style("background-color", "#ffafcc"); // Revert to original color
          weekButton.style("transform", "scale(1)"); // Revert to original size
        });

        weekButton.mousePressed(() => {
          handleWeekClick(i);
        });
      }

      // Add a close button to remove the portfolio popup
      let closePortfolioButton = createButton("關閉");
      closePortfolioButton.parent(portfolioDiv);
      closePortfolioButton.style("margin-top", "10px");
      closePortfolioButton.style("width", "100%");
      closePortfolioButton.style("padding", "10px");
      closePortfolioButton.style("background-color", "#ff6f91"); // Bright pink
      closePortfolioButton.style("color", "#fff");
      closePortfolioButton.style("border", "none");
      closePortfolioButton.style("border-radius", "10px");
      closePortfolioButton.style("cursor", "pointer");
      closePortfolioButton.style("font-size", "16px");
      closePortfolioButton.style("transition", "transform 0.2s, background-color 0.2s"); // Add hover effect

      // Hover effect for close button
      closePortfolioButton.mouseOver(() => {
        closePortfolioButton.style("background-color", "#f48fb1"); // Darker pink on hover
        closePortfolioButton.style("transform", "scale(1.05)"); // Slightly enlarge on hover
      });
      closePortfolioButton.mouseOut(() => {
        closePortfolioButton.style("background-color", "#ff6f91"); // Revert to original color
        closePortfolioButton.style("transform", "scale(1)"); // Revert to original size
      });

      closePortfolioButton.mousePressed(() => {
        if (portfolioDiv) {
          portfolioDiv.remove(); // Remove the portfolio popup
          portfolioDiv = null;
        }
      });
    }
  } else if (index === 3) {
    // "測驗卷" button clicked
    if (!quizDiv) {
      quizDiv = createDiv();
      quizDiv.style("width", "400px");
      quizDiv.style("height", "auto");
      quizDiv.style("background-color", "#fff");
      quizDiv.style("border", "2px solid #000");
      quizDiv.style("border-radius", "10px");
      quizDiv.style("padding", "20px");
      quizDiv.style("position", "absolute"); // Use absolute positioning
      quizDiv.style("top", `${height / 2 - 150}px`); // Center vertically
      quizDiv.style("left", `${width / 2 - 200}px`); // Center horizontally

      // Quiz questions and options
      let questions = [
        {
          question: "1. 教育科技學系的主要研究領域是什麼？",
          options: [
            "A. 教育技術與應用",
            "B. 醫療科技",
            "C. 環境科學",
            "D. 太空探索",
          ],
          correct: "A. 教育技術與應用",
        },
        {
          question: "2. 教育科技學系的核心課程包含什麼？",
          options: [
            "A. 程式設計與開發",
            "B. 醫學影像處理",
            "C. 海洋生態研究",
            "D. 建築設計",
          ],
          correct: "A. 程式設計與開發",
        },
        {
          question: "3. 教育科技學系的畢業生主要從事什麼職業？",
          options: [
            "A. 教育科技專家",
            "B. 醫生",
            "C. 環境工程師",
            "D. 飛行員",
          ],
          correct: "A. 教育科技專家",
        },
      ];

      let currentQuestionIndex = 0; // Track the current question index

      // Function to display a question
      function displayQuestion(index) {
        quizDiv.html(""); // Clear the quizDiv content

        let q = createP(questions[index].question);
        q.parent(quizDiv);

        let options = createRadio();
        options.parent(quizDiv);
        for (let option of questions[index].options) {
          options.option(option);
        }

        // Add feedback area
        let feedback = createP(""); // Empty feedback area
        feedback.style("color", "#000");
        feedback.style("font-size", "16px");
        feedback.style("margin-top", "10px");
        feedback.parent(quizDiv);

        // Add submit button
        let submitButton = createButton("提交");
        submitButton.style("margin-top", "10px");
        submitButton.style("background-color", "#4CAF50");
        submitButton.style("color", "#fff");
        submitButton.style("border", "none");
        submitButton.style("border-radius", "5px");
        submitButton.style("padding", "10px");
        submitButton.style("cursor", "pointer");
        submitButton.parent(quizDiv);

        submitButton.mousePressed(() => {
          let selected = options.value();
          if (selected === questions[index].correct) {
            feedback.html("答對了！").style("color", "green");
          } else {
            feedback.html("答錯了！").style("color", "red");
          }

          // Automatically move to the next question after 1 second
          setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
              displayQuestion(currentQuestionIndex); // Show the next question
            } else {
              feedback.html("你已完成所有題目！").style("color", "blue");
              setTimeout(() => {
                quizDiv.remove(); // Remove the quiz popup
                quizDiv = null;
              }, 2000); // Close the quiz after 2 seconds
            }
          }, 1000); // Wait 1 second before moving to the next question
        });

        // Add close button
        let closeQuizButton = createButton("關閉");
        closeQuizButton.style("margin-top", "10px");
        closeQuizButton.style("background-color", "#ff6666");
        closeQuizButton.style("color", "#fff");
        closeQuizButton.style("border", "none");
        closeQuizButton.style("border-radius", "5px");
        closeQuizButton.style("padding", "10px");
        closeQuizButton.style("cursor", "pointer");
        closeQuizButton.parent(quizDiv);

        closeQuizButton.mousePressed(() => {
          if (quizDiv) {
            quizDiv.remove(); // Remove the quiz popup
            quizDiv = null;
          }
        });
      }

      // Display the first question
      displayQuestion(currentQuestionIndex);
    }
  } else if (index === 4) {
    // "教學影片" button clicked
    if (!weekIframe) {
      weekIframe = createElement("iframe");
      weekIframe.attribute("src", "https://www.youtube.com/embed/V2aAQFTG4F4"); // Embed YouTube video
      weekIframe.attribute("width", "80%");
      weekIframe.attribute("height", "80%");
      weekIframe.style("border", "none"); // Remove iframe border
      weekIframe.position(width / 2 - (width * 0.8) / 2, height / 2 - (height * 0.8) / 2); // Center the iframe

      // Add a close button to remove the iframe
      let closeButton = createButton("關閉");
      closeButton.style("position", "absolute");
      closeButton.style("top", `${height / 2 - (height * 0.8) / 2 - 40}px`); // Position above the iframe
      closeButton.style("left", `${width / 2 + (width * 0.8) / 2 - 60}px`); // Position to the right of the iframe
      closeButton.style("padding", "10px");
      closeButton.style("background-color", "#ff6666");
      closeButton.style("color", "#fff");
      closeButton.style("border", "none");
      closeButton.style("border-radius", "5px");
      closeButton.style("cursor", "pointer");

      closeButton.mousePressed(() => {
        if (weekIframe) {
          weekIframe.remove(); // Remove the iframe
          weekIframe = null;
        }
        closeButton.remove(); // Remove the close button
      });
    }
  }
}

// Function to handle weekly assignment clicks
function handleWeekClick(weekIndex) {
  if (weekIframe) {
    weekIframe.remove(); // Remove existing iframe if present
  }

  if (weekIndex === 0) {
    // "第一周作業" button clicked
    weekIframe = createElement("iframe");
    weekIframe.attribute("src", "https://yenni27.github.io/20250303/");
    weekIframe.attribute("width", "80%");
    weekIframe.attribute("height", "80%");
    weekIframe.position(width / 2 - (width * 0.8) / 2, height / 2 - (height * 0.8) / 2);
  } else if (weekIndex === 1) {
    // "第二周作業" button clicked
    weekIframe = createElement("iframe");
    weekIframe.attribute("src", "https://yenni27.github.io/20250310/");
    weekIframe.attribute("width", "80%");
    weekIframe.attribute("height", "80%");
    weekIframe.position(width / 2 - (width * 0.8) / 2, height / 2 - (height * 0.8) / 2);
  } else if (weekIndex === 2) {
    // "第三周作業" button clicked
    weekIframe = createElement("iframe");
    weekIframe.attribute("src", "https://yenni27.github.io/20250317/");
    weekIframe.attribute("width", "80%");
    weekIframe.attribute("height", "80%");
    weekIframe.position(width / 2 - (width * 0.8) / 2, height / 2 - (height * 0.8) / 2);
  } else if (weekIndex === 3) {
    // "第四周作業" button clicked
    weekIframe = createElement("iframe");
    weekIframe.attribute("src", "https://yenni27.github.io/20250324/");
    weekIframe.attribute("width", "80%");
    weekIframe.attribute("height", "80%");
    weekIframe.position(width / 2 - (width * 0.8) / 2, height / 2 - (height * 0.8) / 2);
  } else {
    alert(`第 ${weekIndex + 1} 周作業功能尚未實現！`);
  }

  // Add a close button to remove the iframe
  let closeButton = createButton("關閉");
  closeButton.style("position", "absolute");
  closeButton.style("top", `${height / 2 - (height * 0.8) / 2 - 40}px`); // Position above the iframe
  closeButton.style("left", `${width / 2 + (width * 0.8) / 2 - 60}px`); // Position to the right of the iframe
  closeButton.style("padding", "10px");
  closeButton.style("background-color", "#ff6666");
  closeButton.style("color", "#fff");
  closeButton.style("border", "none");
  closeButton.style("border-radius", "5px");
  closeButton.style("cursor", "pointer");

  closeButton.mousePressed(() => {
    if (weekIframe) {
      weekIframe.remove(); // Remove the iframe
      weekIframe = null;
    }
    closeButton.remove(); // Remove the close button
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Adjust canvas size on window resize
}
