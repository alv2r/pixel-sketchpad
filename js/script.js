/**
 * Creates the grid of divs inside the canvas
 * @param  {String} gridContainer Canvas selector.
 * @param  {Number} gridSize Total size ot the grid.
 * @return {None}
 */
let createGrid = (gridContainer, gridSize) => {
  let $gridCanvas = gridContainer,
      $pixel = $('<div class="pixel"></div>'),
      pixelSize = 720 / gridSize;

  gridSize = gridSize || 24;
  $gridCanvas.empty();

  for (let i = 0; i < gridSize * gridSize; i++) {
    $gridCanvas.append($pixel.clone());
  }

  $('.pixel').height(720 / gridSize);
  $('.pixel').width(720 / gridSize);
};

/**
 * Adds multiple buttons to enhance canvas funcionality
 * @return {None}
 */
let addOptions = () => {
  let $mainButtons = $('#btns-main'),
      $secButtons = $('#btns-sec'),
      $clearButton = $('<button type="button" name="clear" class="btn btn-primary"> Clear</button>'),
      optionList = ['Rainbow', 'Black', 'Eraser', 'Squares', 'Circles'];

  $mainButtons.append($clearButton);

  // Adds a new button for each of the options in the list
  for (let option of optionList) {
    let nameOption = option.toLowerCase();
    let tempOption = `<button type="button" name=${nameOption} class="btn btn-sec">${option}</button>`;
    $secButtons.append(tempOption);
  }
};

/**
 * Generates a random Hexadecimal color
 * @return {String}   Hexadecimal color
 */
let getRandomColor = () => {
  let letters = '0123456789ABCDEF',
      color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
};

$(document).ready(function(){
  let $gridContainer = $('#canvas'), // Canvas container
      options = false, // If the options are already displayed
      randomColor = false, // If random color option is activated
      pixelBrushColor = 'black', // Pixel brush color
      pixelDefColor = '#F2F2F2', // Pixel default color
      gridSize, // Size of the canvas
      inputMessage = "Insert the number of pixels that will be displayed (1-100)",
      alertMessage = "The number you inserted is either too big or too small," +
                     " defaul size will be displayed :)";

  // Calls the grid and the options creators
  $('button[name="start"]').on('click', function() {
    gridSize = prompt(inputMessage);

    // Maximun size canvas size is 100 and there is no such ting as 0 size canvas
    if (gridSize > 100 || gridSize <= 0) {
      gridSize = 24;
      alert(alertMessage);
    }

    // It will be executed only once
    if (!options) {
      options = true;
      addOptions();
    }

    // Creates the grid no matter what, there is a default size even when undefined
    createGrid($gridContainer, gridSize);
    $(this).text('Resize');
  });

  // Clear the canvas setting all the pixels to the default color
  $(document).on('click', 'button[name="clear"]', function() {
    $('.pixel').css('background-color', pixelDefColor);
  });

  // Changes the pixel's radius to make it a circle
  $(document).on('click', 'button[name="squares"]', function() {
    $('.pixel').css('border-radius', '0');
  });

  // Changes the pixel's radius to make it a square
  $(document).on('click', 'button[name="circles"]', function() {
    $('.pixel').css('border-radius', '50%');
  });

  // Activates the rainbow color option
  $(document).on('click', 'button[name="rainbow"]', function() {
    randomColor = true;
  });

  // Sets the brush color to black
  $(document).on('click', 'button[name="black"]', function() {
    randomColor = false;
    pixelBrushColor = 'black';
  });

  // Sets the brush color to the default to simulate an eraser
  $(document).on('click', 'button[name="eraser"]', function() {
    randomColor = false;
    pixelBrushColor = '#F2F2F2';
  });

  // Adds color to each div pixel whenever the mouse enters
  $(document).on('mouseenter', '.pixel', function() {
    if (!randomColor) {
      $(this).css('background-color', pixelBrushColor);
    } else {
      $(this).css('background-color', getRandomColor());
    }
  });

  // Button styling
  $(document).on('mouseenter', 'button', function() {
    $(this).addClass('highlight-button');
  });

  // Button styling
  $(document).on('mouseleave', 'button', function() {
    $(this).removeClass('highlight-button');
  });
});
