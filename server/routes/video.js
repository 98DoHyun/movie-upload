const express = require('express');
const router = express.Router();
const { Video } = require("../models/Video");
const {Subscriber} = require("../models/Subscriber")
const { auth } = require("../middleware/auth");
const multer = require("multer")
var ffmpeg = require('fluent-ffmpeg');

//=================================
//             video
//=================================

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4') {
            return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
        }
        cb(null, true)
    }
})
const upload = multer({ storage: storage }).single("file")

router.post('/uploadfiles', (req, res) => {
            
    //클라이언트에서 받은 비디오를 서버에 저장한다
    upload(req, res, err => {
        if (err) {
            return res.json({ success:false, err })
        }
        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename })
    })

})

router.post('/thumbnail', (req, res) => {
    
    let filePath ="";
    let fileDuration ="";

    ffmpeg.ffprobe(req.body.url ,function(err, metadata){
        console.dir(metadata);
        console.log(metadata.format.duration);
        fileDuration = metadata.format.duration;
    })


    ffmpeg(req.body.url)
        .on('filenames', function (filenames) {
            console.log('Will generate ' + filenames.join(', '))
            filePath = "uploads/thumbnails/" + filenames[0];
        })
        .on('end', function () {
            console.log('Screenshots taken');
            return res.json({ success: true, url: filePath, fileDuration: fileDuration})
        })
        .on('error', function(err){
            console.log("에러발생")
            return res.json({success : false, err})
        })
        .screenshots({
            // Will take screens at 20%, 40%, 60% and 80% of the video
            count: 1,
            folder: 'uploads/thumbnails',
            size:'320x240',
            // %b input basename ( filename w/o extension )
            filename:'thumbnail-%b.png'
        });

});

router.post('/uploadVideo', (req, res) => {

    //비디오 정보를 몽고디비에 저장한다

   const video = new Video(req.body)

   video.save((err, doc) => {
       if(err) return res.json({ success: false, err })
       res.status(200).json({ success: true })
   })

})

router.get('/getvideos', (req, res) => {
    // 비디오를 db에서 가져와서 랜딩 페이지 던저준다
    Video.find()
    .populate('writer')
    .exec((err, videos) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({ success: true, videos})
        })

})

router.post('/getVideoDetail', (req, res) => {
   
    Video.findOne({ "_id" : req.body.videoId })
    .populate(`writer`)
    .exec((err, VideoDetail) => {
        if(err) return res.status(400).send(err)
        return res.status(200).json({ success: true, VideoDetail })
       })
});


router.post('/getSubscriptionvideos', (req, res) => {
    Subscriber.find({userFrom: req.body.userFrom})
     .exec((err, subscriberInfo) => {
         if(err) return res.status(400).send(err);

         let subscribedUser = [];
         subscriberInfo.map((subscriber, i) => {
             subscribedUser.push(subscriber.userTo);
         })

         Video.find({writer: {$in: subscribedUser} })
         .populate('writer')
         .exec((err, video) => {
             if (err) return res.status(400).send(err);
             res.status(200).json({success: true, video})
             
         })
        
     })

})



module.exports = router;
