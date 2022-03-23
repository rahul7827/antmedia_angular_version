import { Component, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { WebRTCAdaptor } from "@antmedia/webrtc_adaptor";
import { environment } from "../../environments/environment.prod";

@Component({
  selector: "app-peertopeer",
  templateUrl: "./peertopeer.component.html",
  styleUrls: ["./peertopeer.component.css"]
})
export class PeertopeerComponent implements AfterViewInit {
  webRTCAdaptor: any;
  websocketURL: string;
  pc_config: any;
  sdpConstraints: any;
  mediaConstraints: any;
  // streamName: any;
  streamNameBox: string;

  @ViewChild("joinButton") joinButton: ElementRef;
  @ViewChild("leaveButton") leaveButton: ElementRef;
  @ViewChild("turnOnCamera") turnOnCamera: ElementRef;
  @ViewChild("turnOffCamera") turnOffCamera: ElementRef;
  @ViewChild("muteMic") muteMic: ElementRef;
  @ViewChild("unmuteMic") unmuteMic: ElementRef;
  @ViewChild("streamName") streamName: ElementRef;

  constructor() {
    this.websocketURL = environment.WebSocketUrl;

    this.pc_config = {
      iceServers: [
        {
          urls: "stun:stun1.l.google.com:19302"
        }
      ]
    };

    this.sdpConstraints = {
      OfferToReceiveAudio: true,
      OfferToReceiveVideo: true
    };

    this.mediaConstraints = {
      video: true,
      audio: true
    };

    // this.streamName.nativeElement.value = "stream1";
  }

  ngAfterViewInit() {
    // this.streamNameBox = this.streamName.nativeElement.value;
    this.initWebRTCAdaptor();
  }

  initWebRTCAdaptor() {
    this.webRTCAdaptor = new WebRTCAdaptor({
      websocket_url: this.websocketURL,
      mediaConstraints: this.mediaConstraints,
      peerconnection_config: this.pc_config,
      sdp_constraints: this.sdpConstraints,
      localVideoId: "localVideo",
      remoteVideoId: "remoteVideo",
      callback: (info) => {
        if (info === "initialized") {
          console.log("initialized");
          this.joinButton.nativeElement.disabled = false;
          this.leaveButton.nativeElement.disabled = true;
        } else if (info === "joined") {
          //joined the stream
          console.log("joined");
          this.joinButton.nativeElement.disabled = true;
          this.leaveButton.nativeElement.disabled = false;
        } else if (info === "leaved") {
          //leaved the stream
          console.log("leaved");
          this.joinButton.nativeElement.disabled = false;
          this.leaveButton.nativeElement.disabled = true;
        }
      },
      callbackError: function (error) {
        //some of the possible errors, NotFoundError, SecurityError,PermissionDeniedError

        console.log("error callback: " + error);
        alert(error);
      }
    });
  }

  join() {
    console.log("joined", this.streamName.nativeElement.value);
    this.webRTCAdaptor.join(this.streamName.nativeElement.value);
  }

  leave() {
    this.webRTCAdaptor.leave(this.streamName.nativeElement.value);
  }

  turnOffLocalCamera() {
    this.webRTCAdaptor.turnOffLocalCamera();
  }

  turnOnLocalCamera() {
    this.webRTCAdaptor.turnOnLocalCamera();
  }

  muteLocalMic() {
    this.webRTCAdaptor.muteLocalMic();
  }

  unmuteLocalMic() {
    this.webRTCAdaptor.unmuteLocalMic();
  }
}
