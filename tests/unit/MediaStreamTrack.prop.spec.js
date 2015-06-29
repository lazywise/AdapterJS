//mocha.bail();
//mocha.run();

var expect = chai.expect;
var assert = chai.assert;
var should = chai.should;

// Test timeouts
var testTimeout = 25000;

// Get User Media timeout
var gUMTimeout = 15000;

// Test item timeout
var testItemTimeout = 4000;


describe('MediaStreamTrack | Properties', function() {
	this.timeout(testTimeout);

	/* Attributes */
	var stream = null;
	var audioTrack = null;
	var videoTrack = null;

	/* WebRTC Object should be initialized in Safari/IE Plugin */
	before(function (done) {
		this.timeout(testItemTimeout);

		if (window.webrtcDetectedBrowser !== 'IE' && window.webrtcDetectedBrowser !== 'Safari') {
			AdapterJS.onwebrtcreadyDone = true;
		}

		if (!AdapterJS.onwebrtcreadyDone) {
			AdapterJS.onwebrtcready = function () {
				done();
			};

		} else {
			done();
		}
	});

	/* Get User Media */
	before(function (done) {
		this.timeout(gUMTimeout);

		window.navigator.getUserMedia({
			audio: true,
			video: true

		}, function (data) {
			stream = data;
			videoTrack = stream.polygetVideoTracks()[0];
			audioTrack = stream.polygetAudioTracks()[0];
			done();

		}, function (error) {
			throw error;
			done();
		});
	});

	it('MediaStreamTrack.getSources :: static method', function (done) {
		this.timeout(testItemTimeout);

		assert.typeOf(MediaStreamTrack.getSources, 'function');

		MediaStreamTrack.getSources(function (sources) {
			expect(sources.length).to.be.at.least(1);

			var source1 = sources[0];

			assert.typeOf(source1.id, 'string');
			assert.typeOf(source1.kind, 'string');
			assert.typeOf(source1.facing, 'string');
			assert.typeOf(source1.label, 'string');

			var constraints = {};

			constraints[source1.kind] = {
				optional: [{ sourceId: source1.id }]
			};

			window.navigator.getUserMedia(constraints, function (checkStream) {

				var checkTrack = source1.kind === 'audio' ? checkStream.polygetAudioTracks()[0] :
					checkStream.polygetVideoTracks()[0];

				expect(checkTrack.id).to.equal(source1.id);
				done();

			}, function (error) {
				throw error;
			});
		});
	});

	it('MediaStreamTrack.id :: string', function () {
		this.timeout(testItemTimeout);

		assert.typeOf(audioTrack.id, 'string');
		assert.typeOf(videoTrack.id, 'string');

		expect(audioTrack.id).to.not.equal(videoTrack.id);
	});

	it('MediaStreamTrack.ended :: boolean', function () {
		this.timeout(testItemTimeout);

		assert.typeOf(audioTrack.ended, 'boolean');
		assert.typeOf(videoTrack.ended, 'boolean');

		expect(audioTrack.ended).to.equal(false);
		expect(videoTrack.ended).to.equal(false);
	});

	it('MediaStreamTrack.remote :: boolean', function () {
		this.timeout(testItemTimeout);

		assert.typeOf(audioTrack.remote, 'boolean');
		assert.typeOf(videoTrack.remote, 'boolean');

		expect(audioTrack.remote).to.equal(false);
		expect(videoTrack.remote).to.equal(false);
	});

	it('MediaStreamTrack.readyState :: string', function () {
		this.timeout(testItemTimeout);

		assert.typeOf(audioTrack.readyState, 'string');
		assert.typeOf(videoTrack.readyState, 'string');

		expect(audioTrack.readyState).to.equal('live');
		expect(videoTrack.readyState).to.equal('live');
	});

	it('MediaStreamTrack.enabled :: boolean', function () {
		this.timeout(testItemTimeout);

		assert.typeOf(audioTrack.enabled, 'boolean');
		assert.typeOf(videoTrack.enabled, 'boolean');

		expect(audioTrack.enabled).to.equal(true);
		expect(videoTrack.enabled).to.equal(true);

		audioTrack.enabled = false;
		videoTrack.enabled = false;

		expect(audioTrack.enabled).to.equal(false);
		expect(videoTrack.enabled).to.equal(false);
	});

	it('MediaStreamTrack.muted :: boolean', function () {
		this.timeout(testItemTimeout);

		assert.typeOf(audioTrack.muted, 'boolean');
		assert.typeOf(videoTrack.muted, 'boolean');

		expect(audioTrack.muted).to.equal(false);
		expect(videoTrack.muted).to.equal(false);
	});

	it('MediaStreamTrack.kind :: string', function () {
		this.timeout(testItemTimeout);

		assert.typeOf(audioTrack.kind, 'string');
		assert.typeOf(videoTrack.kind, 'string');

		expect(audioTrack.kind).to.equal('audio');
		expect(videoTrack.kind).to.equal('video');
	});

	it('MediaStreamTrack.readOnly :: boolean', function () {
		this.timeout(testItemTimeout);

		assert.typeOf(audioTrack.readOnly, 'boolean');
		assert.typeOf(videoTrack.readOnly, 'boolean');
	});

	it('MediaStreamTrack.label :: string', function () {
		this.timeout(testItemTimeout);

		assert.typeOf(audioTrack.label, 'string');
		assert.typeOf(videoTrack.label, 'string');

		expect(audioTrack.label).to.not.equal('');
		expect(videoTrack.label).to.not.equal('');
	});

	it('MediaStreamTrack.getConstraints :: method', function () {
		this.timeout(testItemTimeout);

		assert.typeOf(videoTrack.getConstraints, 'function');

		var data = videoTrack.getConstraints();
		assert.typeOf(data, 'object');
	});

	it('MediaStreamTrack.applyConstraints :: method', function () {
		this.timeout(testItemTimeout);

		assert.typeOf(videoTrack.applyConstraints, 'function');

		var newConstraints = {
			mandantory: {
				maxHeight: 500
			}
		};

		videoTrack.applyConstraints(newConstraints);
		expect(videoTrack.getConstraints()).to.equal(newConstraints);
	});

	it('MediaStreamTrack.getSettings :: method', function () {
		this.timeout(testItemTimeout);

		assert.typeOf(track.getSettings, 'function');

		var check = videoTrack.getSettings();
		assert.typeOf(check.facing, 'string');
		assert.typeOf(check.frameRate, 'number');
	});

	it('MediaStreamTrack.states :: method', function () {
		this.timeout(testItemTimeout);

		assert.typeOf(videoTrack.states, 'function');
		assert.typeOf(audioTrack.states, 'function');

		assert.typeOf(videoTrack.states(), 'object');
		assert.typeOf(audioTrack.states(), 'object');
	});

	it('MediaStreamTrack.clone :: method', function () {
		this.timeout(testItemTimeout);

		assert.typeOf(audioTrack.clone, 'function');
		assert.typeOf(videoTrack.clone, 'function');

		var clone = audioTrack.clone();
		assert.typeOf(clone, 'object');

		expect(audioTrack.id).to.not.equal(clone.id);
		expect(audioTrack.kind).to.equal(clone.kind);
		expect(audioTrack.label).to.equal(clone.label);
	});

	it('MediaStreamTrack.polystop -> MediaStreamTrack.stop :: method', function (done) {
		this.timeout(testItemTimeout);

		assert.typeOf(audioTrack.polystop, 'function');
		assert.typeOf(videoTrack.polystop, 'function');

		audioTrack.polystop();
		videoTrack.polystop();

		setTimeout(function () {
			expect(audioTrack.ended).to.equal(true);
			expect(videoTrack.ended).to.equal(true);

			expect(audioTrack.readyState).to.equal('ended');
			expect(videoTrack.readyState).to.equal('ended');
			done();
		}, 1500);
	});
});