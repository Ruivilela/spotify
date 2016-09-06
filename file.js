  $(document).ready(function(){
    $('#submit-query').on('click',function(event){
      event.preventDefault()

      var $search = $('#search-query').val()
      $search = $search.split(' ').join('+')

      $.ajax({
        type: 'GET',
        url:'https://api.spotify.com/v1/search?type=artist&query=' + $search,
        success:Search,
        error:Fail
        })

      $('.search-result').on('click',artist_discography)   // Get Albums
    })
  });


function Search(response){
    $('.search-result').empty();
    // console.log(response.artists.items[0].images[0].url)
  response.artists.items.forEach(function(resp,index){
    $('.search-result').append("<div id='" + resp.id + "'> <p>" + resp.name + '</p>' +
    "<img src='"+ resp.images[0].url + "'> </div>") ;   // <div id=''> <p> <img artist_id>
  })
};

function Fail(response){
  console.log('something went wrong Asshole!')
};


// artist albums

function artist_discography(event){
  var artist_id = event.target.parentNode.id;

  $.ajax({
    type:'GET',
    url:"https://api.spotify.com/v1/artists/"+artist_id+"/albums" ,
    success:Show_albuns,
    error:Fail
  })

  // $('#myModal').on('click',album_track) // get Tracks

};

function Show_albuns(response){

  $('.modal-body').empty();
  $('#myModal').modal('show');

  response.items.forEach(function(resp){
    $('.modal-body').append("<div id='" + resp.id + "'> <p>" + resp.name + "</p>  <img src='" + resp.images[0].url + "'> </div>" );
  })
};


// // get playlist of albums
//
// function album_track(event){
//   var album_id = event.target.parentNode.id;
//
//   $.ajax({
//     type:'GET',
//     url:"https://api.spotify.com/v1/albums/"+album_id+"/tracks" ,
//     success:Show_tracks,
//     error:Fail
//   })
// }
//
// function Show_tracks(response){
// 
//   $('.modal-body-tracks').empty();
//   $('#myModal').modal('show');
//
//   response.items.forEach(function(resp){
//     $('.modal-body-tracks').append("<div id='" + resp.id + "'> <p>" + resp.name + "</p> </div>" );
//   })
// };
